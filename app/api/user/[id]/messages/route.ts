import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    if (!id) {
        return NextResponse.json({ message: 'no id provided' }, { status: 500 })
    }

    const receivedMessages = await prisma.message.updateMany({
        where: {
            conversation: {
                participants: {
                    some: {
                        user: { id },
                    },
                },
            },
            received: false,
            sender: { NOT: [{ id }] },
        },
        data: {
            received: true,
        },
    })

    if (!receivedMessages) {
        return NextResponse.json({ message: 'failed to create convers' }, { status: 500 })
    }

    return NextResponse.json({ message: 'successfully created convers' }, { status: 200 })
}
