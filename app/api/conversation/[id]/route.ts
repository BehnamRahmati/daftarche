import { prisma } from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    const messages = await prisma.message.findMany({
        where: {
            conversationId: id,
        },
        include: {
            sender: true,
        },
    })

    const conversation = await prisma.conversation.findUnique({
        where: { id },
    })

    if (!messages || !conversation) {
        return NextResponse.json({}, { status: 500 })
    }

    return NextResponse.json({ messages, conversation }, { status: 200 })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const { message, senderEmail } = await req.json()

    const user = await prisma.user.findUnique({ where: { email: senderEmail } })

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const conversation = await prisma.conversation.update({
        where: { id },
        data: {
            messages: {
                create: {
                    content: message,
                    sender: { connect: { id: user.id } },
                },
            },
        },
        include: { messages: true },
    })

    if (!conversation) {
        return NextResponse.json({ message: 'failed to create convers' }, { status: 500 })
    }

    return NextResponse.json({ message: 'successfully created convers' }, { status: 200 })
}

export async function DELETE(req: NextRequest) {
    return NextResponse.json({ message: 'hi' })
}
