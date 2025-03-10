import { prisma } from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
    const email = (await params).email

    const user = await prisma.user.findUnique({
         where: { email }, 
         include: { 
            contacts: { include : {contact: true} } 
        } 
        })
    return NextResponse.json({ message: 'hi', user }, { status: 200 })
}

export async function PUT(req: NextRequest) {
    return NextResponse.json({ message: 'hi' })
}

export async function DELETE(req: NextRequest) {
    return NextResponse.json({ message: 'hi' })
}
