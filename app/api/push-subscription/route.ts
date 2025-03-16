// src/app/api/subscribe/push/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import webPush from 'web-push'

webPush.setVapidDetails(
    "mailto:behnam.main@gmail.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
)

export async function POST(request: NextRequest) {
    // Extract user email and subscription from the request body
    const { email, subscription } = await request.json()

    if (!email || !subscription) {
        return NextResponse.json({ error: 'Missing email or subscription.' }, { status: 400 })
    }

    // Find the user by email and update their push subscription
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    }

    await prisma.user.update({
        where: { email },
        data: { pushSubscription: subscription , deviceReady: true },
    })

    return NextResponse.json({ success: true })
}
