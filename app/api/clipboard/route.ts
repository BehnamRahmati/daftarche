import { NextRequest, NextResponse } from 'next/server'
import { createNewClipboard, findUserClipboards, retirievingEmail } from './clipboard.services'

export async function GET(req: NextRequest) {
    // retirieving email from search params
    const email = retirievingEmail(req)

    if (!email) {
        return NextResponse.json({ message: 'no email field found' }, { status: 500 })
    }

    //finding clipboards
    const clipboards = await findUserClipboards(email)

    return NextResponse.json(clipboards, { status: 200 })
}

export async function POST(req: NextRequest) {
    // retirieving email from search params
    const data: { content: string; email: string } = await req.json()

    if (!data) {
        return NextResponse.json({ message: 'no data field found' }, { status: 500 })
    }

    const newClipboard = await createNewClipboard(data)

    if (!newClipboard) {
        return NextResponse.json({ message: 'failed to create new user' }, { status: 500 })
    }
    return NextResponse.json({ message: 'successfuly created new user' }, { status: 200 })
}
