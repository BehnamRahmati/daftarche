import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
    const email = (await params).email

    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            contacts: { include: { contact: true } },
            inContacts: { include: { owner: true } }
        },
    })
    
    return NextResponse.json({ message: 'hi', user }, { status: 200 })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
    const email = (await params).email

    await prisma.user.update({
        where: { email },
        data: {
            isOnline: true,
            lastActive: new Date(),
        },
    })

    return NextResponse.json({ message: 'ok' })
}

// export async function DELETE() {
//     return NextResponse.json({ message: 'hi' })
// }
