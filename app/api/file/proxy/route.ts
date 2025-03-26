import { s3client } from '@/lib/file.services'
import { prisma } from '@/lib/prisma'
import { GetObjectCommand, S3ServiceException } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import archiver from 'archiver'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import stream from 'stream'
import { v4 as uuidv4 } from 'uuid'

const Bucket = process.env.s3_BUCKET_NAME!
const MAX_SPACE = 5368709120

// post request
export async function POST(request: NextRequest) {
    // * 1.0 - s3client for uploading to storage

    try {
        // * 2.0 initiate constants
        // 2.1 fields
        const { email, url } = await request.json()
        // 2.2 parsed url
        const parsedUrl = new URL(decodeURIComponent(url))
        // 2.3 starting archiving
        const archive = archiver('zip', {
            zlib: { level: 9 },
            store: true, // Enable store mode for buffer compatibility
        })
        // 2.4 getting user
        const user = await prisma.user.findUnique({
            where: { email },
            include: { files: true },
        })
        let usage = 0
        const zipId = uuidv4()
        const zipFilename = `${zipId}.zip`

        // checking if fields and user exist
        if (!url || !user) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
        }

        for (const file of user.files) {
            usage = usage + file.size
        }

        const zipFileRecord = await prisma.file.create({
            data: {
                url: `download-${Date.now()}.zip`,
                filename: `download-${Date.now()}.zip`,
                type: 'ARCHIVE',
                size: 0,
                mimeType: 'application/zip',
                userId: user.id,
                status: 'PENDING',
            },
        })

        // * 3.0 - downlading file from url
        const response = await axios.get(url, { responseType: 'stream' })

        // * 4.0 - passing downloadded file to archiver
        const passThrough = new stream.PassThrough()
        archive.pipe(passThrough)

        archive.on('entry', () => console.log('entry'))
        archive.on('finish', () => console.log('finish'))
        archive.on('error', error => console.log(error))
        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                // log warning
                console.log(err.message)
            } else {
                // throw error
                throw err
            }
        })

        const filename = path.basename(parsedUrl.pathname) || `file-${Date.now()}`
        archive.append(response.data, { name: filename }).finalize()

        const s3Params = {
            Bucket,
            Key: zipFilename,
            Body: passThrough,
        }

        const upload = new Upload({
            client: s3client,
            params: s3Params,
            queueSize: 4,
            leavePartsOnError: false,
        })

        try {
            // * 5.0 - uploading process

            if (archive.pointer() > MAX_SPACE || archive.pointer() > MAX_SPACE - usage) {
                throw new Error('exceeded maxiomum space')
            }

            upload.on('httpUploadProgress', progress => {
                console.log(progress)
            })

            await upload.done()

            const downloadCommand = new GetObjectCommand({
                Bucket,
                Key: zipFilename,
            })

            // * 6.0 - Generate presigned URL with 7 day expiration
            const permanentSignedUrl = await getSignedUrl(
                s3client,
                downloadCommand,
                { expiresIn: 604800 }, // 7 days maximum
            )

            // Update database record
            await prisma.file.update({
                where: { id: zipFileRecord.id },
                data: {
                    size: archive.pointer(),
                    status: 'COMPLETED',
                    url: permanentSignedUrl,
                },
            })

            return NextResponse.json({
                downloadUrl: permanentSignedUrl,
                expires: Date.now() + 3600000, // 1 hour
            })
        } catch (error) {
            if (error instanceof S3ServiceException) {
                // Handle AWS-specific errors
                console.error(`AWS Error [${error.$metadata.httpStatusCode}]:`, error.message)

                // Handle specific error codes
                if (error.name === 'NoSuchBucket') {
                    console.error('Bucket does not exist')
                } else if (error.name === 'AccessDenied') {
                    console.error('Permission denied')
                }
            } else {
                // Handle non-AWS errors (network, filesystem, etc.)
                console.error('Upload failed:', error)
            }

            // Update database record
            await prisma.file.update({
                where: { id: zipFileRecord.id },
                data: {
                    status: 'FAILED',
                },
            })
            if (error instanceof Error) {
                console.log(error.message)
            }
            return NextResponse.json(
                { error: `Failed to process file: ${error instanceof Error ? error.message : 'Unknown error'}` },
                { status: 500 },
            )
        }
    } catch (err) {
        console.error('Archive creation failed:', err)
        return NextResponse.json({ mesg: 'Archive creation failed:', err })
    }
}
