import LoginForm from '@/app/[locale]/login/login-form'
import React from 'react'

export default function LoginPage() {
    return (
        <div className='h-dvh w-dvw overflow-hidden relative'>
            <div className="h-1/2 w-full bg-zinc-100"></div>
            <div className="h-1/2 w-full bg-black"></div>
            <LoginForm />
        </div>
    )
}
