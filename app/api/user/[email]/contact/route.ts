import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
    const email = (await params).email

    const contact = await prisma.contact.findMany({
        where: { owner: { email } },
    })
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            contacts: { include: { contact: true } },
            inContacts: { include: { owner: true } },
        },
    })

    if (!user || !contact) {
        return NextResponse.json([], { status: 500 })
    }

    const userContacts = user?.contacts.map(c => c.contact)
    const userInContacts = user?.inContacts.map(c => c.owner)

    const contacts = [...userContacts, ...userInContacts]

    return NextResponse.json({ contact, contacts }, { status: 200 })
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
