import { s3client } from '@/lib/file.services'
import { prisma } from '@/lib/prisma'
import { GetObjectCommand, S3ServiceException } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import archiver from 'archiver'
import { NextRequest, NextResponse } from 'next/server'
import stream from 'stream'
import { v4 as uuidv4 } from 'uuid'

const Bucket = process.env.s3_BUCKET_NAME!
const MAX_SPACE = 5368709120

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File
        const email = formData.get('email') as string
        let usage = 0
        const archive = archiver('zip', {
            zlib: { level: 9 },
            store: true, // Enable store mode for buffer compatibility
        })

        if (!email || !file) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { email },
            include: { files: true },
        })
        // checking if fields and user exist
        if (!user) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
        }

        for (const file of user.files) {
            usage = usage + file.size
        }

        const zipId = uuidv4()
        const zipFilename = `${file.name}.zip`

        const zipFileRecord = await prisma.file.create({
            data: {
                url: `${zipId}-${file.name}.zip`,
                filename: file.name,
                type: 'ARCHIVE',
                size: 0,
                mimeType: 'application/zip',
                userId: user.id,
                status: 'PENDING',
            },
        })
        const passThrough = new stream.PassThrough()
        archive.pipe(passThrough)
        const fileBuffer = Buffer.from(await file.arrayBuffer())
        archive.append(fileBuffer, { name: file.name }).finalize()

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
            if (file.size > MAX_SPACE || file.size > MAX_SPACE - usage) {
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
    } catch (error) {
        console.log(error)
        return NextResponse.json('hi')
    }
}
