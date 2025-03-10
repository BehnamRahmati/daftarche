'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function LoginForm() {
    const { data: session } = useSession()

    if (session) {
        return (
            <div>
                <button className='cursor-pointer text-sm' type='button' onClick={() => signOut()}>
                    Sign out
                </button>
            </div>
        )
    }

    return (
        <div>
            <button
                className='cursor-pointer rounded-xl border border-gray-200 bg-white px-5 py-3'
                type='button'
                onClick={() => signIn('google')}
            >
                Sign in with Google
            </button>
        </div>
    )
}
