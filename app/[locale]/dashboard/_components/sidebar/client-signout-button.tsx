'use client'

import { signOut } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { FiLogOut } from 'react-icons/fi'

export default function SignoutButton() {
    const { locale } = useParams()

    return (
        <button type='button' onClick={() => signOut()} className='flex w-full cursor-pointer justify-start gap-2'>
            <FiLogOut />
            <p>{locale === 'en' ? 'log out' : 'خروج'}</p>
        </button>
    )
}
