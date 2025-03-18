import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { markInactiveUsersOffline } from '../api/user/user.services'
import '../globals.css'

// Run this periodically, e.g., every 5-10 minutes
setInterval(markInactiveUsersOffline, 300000) // 5 minutes

const poppins = Poppins({
    weight: ['100', '300', '400', '500', '700', '800', '900'],
    subsets: ['latin'],
})
export const viewport: Viewport = {
    themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#ffffff' }],
}

export const metadata: Metadata = {
    title: 'Daftarche',
    description: 'Daftarche is for clipboard , chat and files.',
    applicationName: 'Daftarche', // Optional: Application name
    generator: 'Next.js',
    manifest: '/manifest.json',
    keywords: ['nextjs', 'next14', 'pwa', 'next-pwa'],
    icons: [
        { rel: 'apple-touch-icon', url: '/apple-icon.png' },
        { rel: 'icon', url: '/icon.png' },
    ],
}

type TProps = Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: 'fa' | 'en' }>
}>

export default async function RootLayout({ children, params }: TProps) {
    const locale = (await params).locale

    return (
        <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} suppressHydrationWarning>
            <body className={`antialiased ${poppins.className}`}>
                <Providers>{children}</Providers>
                <Toaster dir={locale === 'fa' ? 'rtl' : 'ltr'} position={locale === 'fa' ? 'bottom-right' : 'bottom-left'} />
            </body>
        </html>
    )
}
