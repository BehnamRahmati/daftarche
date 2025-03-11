import { prisma } from '@/lib/prisma'

export const markInactiveUsersOffline = async () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)

    await prisma.user.updateMany({
        where: {
            isOnline: true,
            lastActive: { lt: fiveMinutesAgo }, // Filter users inactive for more than 5 minutes
        },
        data: {
            isOnline: false,
        },
    })
}
