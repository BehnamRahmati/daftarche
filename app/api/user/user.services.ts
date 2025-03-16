import { prisma } from '@/lib/prisma'

export const markInactiveUsersOffline = async () => {
    const threshold = new Date(Date.now() - 5 * 60 * 1000)

    await prisma.user.updateMany({
        where: {
            isOnline: true,
            lastActive: { lt: threshold }, // Filter users inactive for more than 5 minutes
        },
        data: {
            isOnline: false,
        },
    })
}

// Mark users as offline after 5 minutes of inactivity (NO SESSION NEEDED)
export async function startMessageHeartbeat(email: string) {
    // Validate authentication
    await prisma.message.updateMany({
        where: {
            conversation: {
                participants: {
                    some: {
                        user: { email },
                    },
                },
            },
            received: false,
            sender: { NOT: { email } },
        },
        data: {
            received: true,
        },
    })
}
