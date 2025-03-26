import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id

        if (!id) {
            throw new Error("you didn't provide an id")
        }

        const contact = await prisma.contact.findMany({
            where: { ownerId: id },
        })
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                contacts: { include: { contact: true } },
                inContacts: { include: { owner: true } },
            },
        })

        if (!user || !contact) {
            throw new Error('couldnt find user or contacts')
        }

        const userContacts = user?.contacts.map(c => c.contact)
        const userInContacts = user?.inContacts.map(c => c.owner)

        const contacts = [...userContacts, ...userInContacts]

        return NextResponse.json({ contact, contacts }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id
        const contactEmail = await req.json()
        if (!contactEmail) {
            throw new Error("you didn't provide an email")
        }

        if (!id) {
            throw new Error("you didn't provide contact id")
        }

        const newContact = await prisma.contact.create({
            data: {
                owner: { connect: { id } },
                contact: { connect: { email: contactEmail } },
            },
        })

        if (!newContact) {
            throw new Error('failed to create new contact')
        }

        return NextResponse.json(newContact, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
