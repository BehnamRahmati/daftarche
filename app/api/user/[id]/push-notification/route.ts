// src/app/api/subscribe/push/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import webPush from 'web-push'

webPush.setVapidDetails('mailto:behnam.main@gmail.com', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!, process.env.VAPID_PRIVATE_KEY!)

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    
    const { subscription } = await request.json()
    const id = (await params).id

    

    if (!subscription || !id) {
        return NextResponse.json({ error: 'Missing email or subscription.' }, { status: 400 })
    }

    await prisma.user.update({
        where: { id },
        data: { pushSubscription: subscription, deviceReady: true },
    })

    return NextResponse.json({ success: true })
}
