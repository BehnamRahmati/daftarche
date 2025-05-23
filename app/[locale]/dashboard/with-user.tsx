import { authOptions } from '@/app/api/auth/[...nextauth]/auth.services'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export type TWithUserProp = {
    user: {
        id: string
        name: string
        email: string
        image: string
    }
}

export default function WithUser<P extends Record<string, unknown>>(WrappedComponent: React.ComponentType<P & TWithUserProp>) {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

    const ComponentWithUser = async (props: Omit<P, keyof TWithUserProp>) => {
        const session = await getServerSession(authOptions)
        if (!session || !session.user || !session.user.name || !session.user.email || !session.user.image || !session.user.id) {
            redirect(`/en/login`)
        }

        const user = { name: session.user.name, email: session.user.email, image: session.user.image, id: session.user.id }
        // await markUserOnlinePeriodically(user.id)
        return <WrappedComponent {...(props as P)} user={user} />
    }

    ComponentWithUser.displayName = `withTheme(${displayName})`
    return ComponentWithUser
}
