import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { email } = await request.json()
    const receivedMessages = await prisma.message.findMany({
        where: {
            conversation: {
                participants: {
                    some: {
                        user: { email },
                    },
                },
            },
            received: true,
            read: false,
            sender: { NOT: [{ email }] },
        },
        include: { sender: true },
    })

    if (!receivedMessages || receivedMessages.length === 0) {
        return NextResponse.json([], { status: 200 })
    }

    return NextResponse.json(receivedMessages, { status: 200 })
}
