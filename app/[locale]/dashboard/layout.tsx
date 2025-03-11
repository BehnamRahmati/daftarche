import { TParamsLocale } from '@/app/[locale]/_contants'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { DashboardFooter, DashboardHeader, DashboardSidebar } from './_components'

type TProps = TParamsLocale &{
        children: React.ReactNode
    }

async function DashboardLayout({ children, params }: TProps) {
    const locale = (await params).locale
    return (
        <SidebarProvider className='layout'>
            {/* sidebar */}
            <DashboardSidebar locale={locale} />

            {/* page content */}
            <div className='layout-main'>
                {/* header */}
                <DashboardHeader locale={locale} />

                {/* main content */}
                <main className='h-full lg:max-h-[calc(100dvh-15rem)]'>{children}</main>

                {/* footer */}
                <DashboardFooter />
                
            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout
