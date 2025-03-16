import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const { searchParams } = new URL(req.url)
    const cursor = searchParams.get('cursor')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Validate cursor format
    let cursorDate: Date | undefined
    if (cursor) {
        cursorDate = new Date(cursor)
        if (isNaN(cursorDate.getTime())) {
            return NextResponse.json({ error: 'Invalid cursor format' }, { status: 400 })
        }
    }

    const messages = await prisma.message.findMany({
        where: { conversationId: id, ...(cursor && { createdAt: { lt: cursorDate } }) },
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
            sender: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
    })

    const conversation = await prisma.conversation.findUnique({
        where: { id },
        include: {
            participants: { include: { user: true } },
        },
    })

    if (messages.length === 0 || !conversation) {
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
    }

    // const lastMessage = messages[messages.length - 1]
    const nextCursor = messages.length > 0 ? messages[messages.length - 1].createdAt.toISOString() : null

    return NextResponse.json({
        messages: messages, // Reverse for correct chronological order
        conversation,
        nextCursor,
    })
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

export async function PATCH(req: NextRequest) {
    const { email, conversationId } = await req.json()
    const readMessages = await prisma.message.updateMany({
        where: {
            conversationId,
            read: false,
            sender: { NOT: [{ email }] },
        },
        data: {
            read: true,
            received: true,
        },
    })

    if (!readMessages) {
        return NextResponse.json({ message: 'failed to create convers' }, { status: 500 })
    }

    return NextResponse.json({ message: 'successfully created convers' }, { status: 200 })
}
