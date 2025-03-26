import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id

        if (!id) {
            throw new Error("you didn't provide an id")
        }

        const conversations = await prisma.conversation.findMany({
            where: { participants: { some: { userId: id } } },
            include: {
                participants: {
                    include: {
                        user: true,
                    },
                },
                messages: { orderBy: { createdAt: 'desc' }, take: 1 },
            },
        })

        if (!conversations) {
            throw new Error('coudnt file any file')
        }

        return NextResponse.json(conversations, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id
        const { recipientId } = await req.json()

        if (!id || !recipientId) {
            throw new Error("you didn't provide an id")
        }

        // Find an existing conversation between sender and recipient
        let conversation = await prisma.conversation.findFirst({
            where: {
                participants: {
                    every: {
                        OR: [{ userId: id }, { userId: recipientId }],
                    },
                },
            },
            include: { participants: true },
        })

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participants: {
                        create: [
                            { userId: id }, // Add sender as a participant
                            { userId: recipientId }, // Add recipient as a participant
                        ],
                    },
                },
                include: {
                    participants: true,
                },
            })
        }
        return NextResponse.json({ conversation, status: 200 }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
