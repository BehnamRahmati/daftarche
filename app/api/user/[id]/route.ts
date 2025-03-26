import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id

        if (!id) {
            throw new Error("you didn't provide an id")
        }

        const user = await prisma.user.findUnique({ where: { id } })

        if (!user) {
            throw new Error("couldn't find user")
        }

        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id

        if (!id) {
            throw new Error("you didn't provide an id")
        }

        const user = await prisma.user.update({
            where: { id },
            data: {
                isOnline: true,
                lastActive: new Date(),
            },
        })

        if (!user) {
            throw new Error("couldn't update user")
        }

        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
