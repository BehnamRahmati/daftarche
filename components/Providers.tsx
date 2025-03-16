'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/theme-provider'
import React from 'react'

type TProps = {
    children: React.ReactNode
}

export default function Providers({ children }: TProps) {
    return (
        <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </SessionProvider>
    )
}
