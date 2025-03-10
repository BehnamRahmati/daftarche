import { prisma } from '@/libs/prisma'
import CryptoJS from 'crypto-js'
import { NextRequest } from 'next/server'

export function retirievingEmail(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    return searchParams.get('email')
}

export async function findUserClipboards(email: string) {
    // retrieving clipboards
    const clipboards = await prisma.clipboard.findMany({ where: { user: { email } } })

    // check if have clipboards
    if (!clipboards || clipboards.length === 0) {
        return []
    }

    // return clipboards with decrypted content
    return clipboards.map(clip => ({
        ...clip,
        content: CryptoJS.AES.decrypt(clip.content, process.env.ENCRYPTION_SECRET!).toString(CryptoJS.enc.Utf8),
    }))
}

export async function createNewClipboard({ content, email }: { content: string; email: string }) {
    // encripting content
    const encryptedContent = CryptoJS.AES.encrypt(content, process.env.ENCRYPTION_SECRET!).toString()

    // creating new clipboard in db
    const newClipboard = await prisma.clipboard.create({
        data: { content: encryptedContent, user: { connect: { email } } },
    })

    if (!newClipboard) {
        return null
    }

    return {
        ...newClipboard,
        content: CryptoJS.AES.decrypt(newClipboard.content, process.env.ENCRYPTION_SECRET!).toString(CryptoJS.enc.Utf8),
    }
}

export async function deleteClipboard(id: string) {
    return await prisma.clipboard.delete({ where: { id } })
}
