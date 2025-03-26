import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id

        if (!id) {
            throw new Error("you didn't provide an id")
        }

        const files = await prisma.file.findMany({ where: { userId: id } })

        if (!files) {
            throw new Error('coudnt file any file')
        }

        return NextResponse.json(files, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
