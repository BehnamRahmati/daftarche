import { createNewClipboard, findUserClipboards } from '@/app/api/clipboard/clipboard.services'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id

        if (!id) {
            throw new Error("you didn't provide an id")
        }

        const clipboards = await findUserClipboards(id)

        if (!clipboards) {
            throw new Error('coudnt file any file')
        }

        return NextResponse.json(clipboards, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id
        const { content } = await req.json()

        if (!id || !content) {
            throw new Error("you didn't provide an id")
        }

        const newClipboard = await createNewClipboard({ content, id })

        if (!newClipboard) {
            throw new Error('coudnt file any file')
        }

        return NextResponse.json(newClipboard, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
