import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
        return NextResponse.json('no email')
    }

    const files = await prisma.file.findMany({
        where: { user: { email } },
    })

    if (!files) {
        return NextResponse.json('no files')
    }

    return NextResponse.json(files)
}

