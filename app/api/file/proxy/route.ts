import { prisma } from '@/lib/prisma'
import archiver from 'archiver'
import axios from 'axios'
import { createWriteStream } from 'fs'
import fs from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { URL } from 'url'
import { v4 as uuidv4 } from 'uuid'
const MAX_ZIP_SIZE = 1024 * 1024 * 500 // 500MB
const MAX_FILE_SIZE = 1024 * 1024 * 100 // 100MB
const DOWNLOAD_DIR = path.join(process.cwd(), 'public/downloads')
const DOWNLOAD_URL_BASE = '/api/file/proxy'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const sourceUrl = searchParams.get('url')

    if (!sourceUrl) {
        return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 })
    }

    const parsedUrl = new URL(decodeURIComponent(sourceUrl))

    // Get file metadata
    const headResponse = await axios.head(parsedUrl.toString())
    const contentLength = parseInt(headResponse.headers['content-length'] || '0')

    if (contentLength > MAX_FILE_SIZE) {
        return NextResponse.json({ error: `File exceeds maximum size of ${MAX_FILE_SIZE / 1024 / 1024}MB` }, { status: 413 })
    }

    const getFileExt = (type: string) => {
        if (type) {
            return `.${type.split('/').pop()}`
        } else {
            return '.bin'
        }
    }

    console.log(getFileExt(headResponse.headers['content-type']))

    // Generate safe filename
    const fileExt = path.extname(parsedUrl.pathname) || getFileExt(headResponse.headers['content-type'])
    const fileName = `${uuidv4()}${fileExt}`
    const filePath = path.join(DOWNLOAD_DIR, fileName)

    // Ensure downloads directory exists
    await fs.mkdir(DOWNLOAD_DIR, { recursive: true })

    // Stream file to disk
    const response = await axios({
        method: 'get',
        url: parsedUrl.toString(),
        responseType: 'stream',
    })
    const writer = createWriteStream(filePath)
    response.data.pipe(writer)

    await new Promise<void>((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })

    return NextResponse.json({
        downloadUrl: `${DOWNLOAD_URL_BASE}/${fileName}`,
        expires: Date.now() + 3600000, // 1 hour expiration
    })
}

export async function POST(request: Request) {
    const { urls, email } = await request.json()

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    if (!urls?.length || !Array.isArray(urls)) {
        return NextResponse.json({ error: 'Invalid URL list' }, { status: 400 })
    }

    try {
        const zipId = uuidv4()
        const zipFilename = `${zipId}.zip`
        const zipPath = path.join(DOWNLOAD_DIR, zipFilename)
        await fs.mkdir(DOWNLOAD_DIR, { recursive: true })

        const output = createWriteStream(zipPath)
        const archive = archiver('zip', { zlib: { level: 9 } })
        let totalSize = 0

        archive.pipe(output)

        // Create File record for the zip
        const zipFileRecord = await prisma.file.create({
            data: {
                url: `/api/download/${zipFilename}`,
                filename: `download-${Date.now()}.zip`,
                type: 'ARCHIVE',
                size: 0,
                mimeType: 'application/zip',
                userId: user.id,
                status: 'PENDING',
            },
        })

        for (const url of urls) {
            try {
                const parsedUrl = new URL(decodeURIComponent(url))

                //   if (!ALLOWED_DOMAINS.has(parsedUrl.hostname)) {
                //     throw new Error(`Domain not allowed: ${parsedUrl.hostname}`);
                //   }

                const headRes = await axios.head(parsedUrl.toString())
                const contentLength = parseInt(headRes.headers['content-length']) || 0

                if (totalSize + contentLength > MAX_ZIP_SIZE) {
                    throw new Error('Total size exceeds 500MB limit')
                }

                const response = await axios({
                    method: 'get',
                    url: parsedUrl.toString(),
                    responseType: 'stream',
                })

                const filename = path.basename(parsedUrl.pathname) || `file-${Date.now()}`

                archive.append(response.data, { name: filename })
                totalSize += contentLength
            } catch (error) {
                await prisma.file.update({
                    where: { id: zipFileRecord.id },
                    data: { status: 'FAILED' },
                })

                return NextResponse.json({ error: `Failed to add ${url}: ${error}` }, { status: 500 })
            }
        }

        await new Promise<void>((resolve, reject) => {
            archive.on('error', reject)
            output.on('close', resolve)
            archive.finalize()
        })

        const finalSize = archive.pointer()

        await prisma.file.update({
            where: { id: zipFileRecord.id },
            data: {
                size: finalSize,
                status: 'COMPLETED',
                url: `/api/file/proxy/${zipFilename}`,
            },
        })

        return NextResponse.json({
            downloadUrl: `/api/download/${zipFilename}`,
            expires: Date.now() + 3600000, // 1 hour
        })
    } catch (error) {
        console.error('Zipped download error:', error)
        return NextResponse.json({ error: 'Failed to create zip archive' }, { status: 500 })
    }
}
