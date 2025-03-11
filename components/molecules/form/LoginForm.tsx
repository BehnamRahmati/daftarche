'use client'

import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function LoginForm() {
    const { data: session } = useSession()

    if (session) {
        redirect('/dashboard')
    }

    return (
        <div>
            <button
                className='cursor-pointer rounded-xl border-accent bg-background px-5 py-3'
                type='button'
                onClick={() => signIn('google')}
            >
                Sign in with Google
            </button>
        </div>
    )
}
