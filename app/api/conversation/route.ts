import { prisma } from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
        return NextResponse.json({ message: 'lets go back in time' }, { status: 500 })
    }

    const conversations = await prisma.conversation.findMany({
        where: {
            participants: {
                some: {
                    user: { email },
                },
            },
        },
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
        return NextResponse.json({ message: 'lets go back in time' })
    }

    return NextResponse.json(conversations, { status: 200 })
}

export async function POST(req: NextRequest) {
    const { senderEmail, recipientId } = await req.json()

    const sender = await prisma.user.findUnique({ where: { email: senderEmail } })

    
    

    if (!senderEmail || !recipientId || !sender) {
        return NextResponse.json({ message: 'failed', status: 500 })
    }


    // Find an existing conversation between sender and recipient
    let conversation = await prisma.conversation.findFirst({
        where: {
            participants: {
                every: {
                    OR: [{ userId: sender.id }, { userId: recipientId }],
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
                        { userId: sender.id }, // Add sender as a participant
                        { userId: recipientId }, // Add recipient as a participant
                    ],
                },
            },
            include: {
                participants: true,
            },
        })
    }

    return NextResponse.json({ message: 'successful', status: 200 , conversation })
}
