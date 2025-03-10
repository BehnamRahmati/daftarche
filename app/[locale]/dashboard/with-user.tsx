import { authOptions } from '@/app/api/auth/[...nextauth]/auth.services'
import { TUser } from '@/libs/clipboard.helpers'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export type TWithUserProp = {
    user: TUser
}

export default function WithUser<P extends object>(WrappedComponent: React.ComponentType<P & TWithUserProp>): React.FC<P> {
    return async (props: P) => {
        const session = await getServerSession(authOptions)
        if (!session || !session.user || !session.user.name || !session.user.email || !session.user.image) {
            redirect(`/login`)
        }
        const user = { name: session.user.name, email: session.user.email, image: session.user.image }
        return <WrappedComponent {...props} user={user} />
    }
}
