import { TParamsLocale } from '@/app/[locale]/_contants'
import DashboardFooter from '@/app/[locale]/dashboard/_components/footer/dashboard-footer'
import DashboardHeader from '@/app/[locale]/dashboard/_components/header/dashboard-header'
import DashboardSidebar from '@/app/[locale]/dashboard/_components/sidebar/dashboard-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

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
                <main className='flex-1'>{children}</main>

                {/* footer */}
                <DashboardFooter />
            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout
