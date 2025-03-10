import { prisma } from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
    const email = (await params).email

    const contacts = await prisma.contact.findMany({
        where: { owner: { email } },
        include: {
            contact: true,
        },
    })

    if (!contacts) {
        return NextResponse.json([], { status: 500 })
    }
    return NextResponse.json(contacts, { status: 200 })
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
    const userEmail = (await params).email
    const contactEmail = await req.json()

    const newContact = await prisma.contact.create({
        data: {
            owner: { connect: { email: userEmail } },
            contact: { connect: { email: contactEmail } },
        },
    })

    if (!newContact) {
        return NextResponse.json({ message: 'failed' }, { status: 500 })
    }

    console.log(newContact)

    return NextResponse.json({ message: 'created' }, { status: 200 })
}

