import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '../globals.css'
import { TParamsLocale } from './_contants'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/sonner'

const poppins = Poppins({
    weight: ['100', '300', '400', '500', '700', '800', '900'],
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Daftarche',
    description: 'Daftarche is for clipboard , chat and files.',
}

type TProps = TParamsLocale &
    Readonly<{
        children: React.ReactNode
    }>

export default async function RootLayout({ children, params }: TProps) {
    const locale = (await params).locale

    return (
        <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}  suppressHydrationWarning>
            <body className={`antialiased ${poppins.className}`}>
                <Providers>{children}</Providers>
                <Toaster dir={locale === 'fa' ? 'rtl' : 'ltr'}  position={locale === 'fa' ? 'bottom-right' : 'bottom-left'}  />
            </body>
        </html>
    )
}
