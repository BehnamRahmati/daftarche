// src/app/api/notify/message-event/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import webPush from 'web-push'

webPush.setVapidDetails('mailto:behnam.main@gmail.com', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!, process.env.VAPID_PRIVATE_KEY!)

export async function POST(request: NextRequest) {
    // Extract user email, messageId, and eventType from the request body
    const { email, eventType } = await request.json()

    if (!email || !eventType) {
        return NextResponse.json({ error: 'Missing email, messageId, or eventType.' }, { status: 400 })
    }

    // Find the user by email and retrieve their push subscription
    const user = await prisma.user.findUnique({
        where: { email },
        select: { pushSubscription: true },
    })

    if (!user?.pushSubscription) {
        return NextResponse.json({ error: 'User has not set up push notifications.' }, { status: 404 })
    }

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
        }
    })

    if (!receivedMessages.length) {
        return NextResponse.json({ error: 'no received message.' }, { status: 404 })
    }

    // Define the notification payload
    const payload = JSON.stringify({
        title: eventType === 'received' ? 'New Message Received' : 'Message Read',
        body: `You have new messages!`,
    })

    const userPushSubscription: webPush.PushSubscription = JSON.parse(JSON.stringify(user.pushSubscription))

    // Send the notification using web-push
    try {
        await webPush.sendNotification(userPushSubscription, payload)
    } catch (err) {
        console.error('Error sending notification:', err)
        return NextResponse.json({ error: 'Failed to send notification.' }, { status: 500 })
    }

    console.log(receivedMessages)

    return NextResponse.json({ success: true }, { status: 200 })
}
