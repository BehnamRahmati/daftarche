import { prisma } from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    return NextResponse.json({ message: 'hi' })
}

export async function PUT(req: NextRequest) {
    return NextResponse.json({ message: 'hi' })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    const contact = await prisma.contact.delete({ where: { id } })

    if (!contact) {
        return NextResponse.json({ message: 'failed to deleted the contact' }, { status: 500 })
    }

    return NextResponse.json({ message: 'successfully deleted the contact' }, { status: 200 })
}
