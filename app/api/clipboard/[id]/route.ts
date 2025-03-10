import { NextRequest, NextResponse } from 'next/server'
import { deleteClipboard } from '../clipboard.services'

export async function GET(req: NextRequest) {
    return NextResponse.json({ message: 'hi' })
}

export async function PUT(req: NextRequest) {
    return NextResponse.json({ message: 'hi' })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const clipboard = await deleteClipboard(id)

    if (!clipboard) {
        return NextResponse.json({ message: 'failed to deleted the clipboard' }, { status: 500 })
    }

    return NextResponse.json({ message: 'successfully deleted the clipboard' }, { status: 200 })
}
