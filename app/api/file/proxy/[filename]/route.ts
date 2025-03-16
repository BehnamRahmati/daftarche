import { prisma } from '@/lib/prisma'
import { createReadStream } from 'fs'
import fs from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'
const DOWNLOAD_DIR = path.join(process.cwd(), 'public/downloads')

export async function GET(request: Request, { params }: { params: Promise<{ filename: string } >}) {
    const filename = (await params).filename
    try {
        const fileRecord = await prisma.file.findUnique({
            where: { url: `/api/file/proxy/${filename}` },
        })

        if (!fileRecord || fileRecord.status !== 'COMPLETED') {
            return new Response('File not available', { status: 404 })
        }

        const filePath = path.join(DOWNLOAD_DIR, filename)
        const stats = await fs.stat(filePath)

        // Update download count
        await prisma.file.update({
            where: { id: fileRecord.id },
            data: { downloads: { increment: 1 } },
        })

        const fileStream = createReadStream(filePath)

        return new Response(fileStream as any, {
            headers: {
                'Content-Type': fileRecord.mimeType,
                'Content-Disposition': `attachment; filename="${fileRecord.filename}"`,
                'Content-Length': stats.size.toString(),
                'X-Archive-Contents': fileRecord.type === 'ARCHIVE' ? 'true' : 'false',
            },
        })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
