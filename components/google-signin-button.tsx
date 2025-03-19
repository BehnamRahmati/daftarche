'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from './ui/button'

export default function GoogleSignInButton() {
    return (
        <Button
            variant={'outline'}
            type='button'
            size={'lg'}
            onClick={() => signIn('google')}
            className='flex items-center gap-2.5 mx-auto'
        >
            <FcGoogle />
            Sign in or register with Google
        </Button>
    )
}
