
import ServiceWorkerRegister from '@/components/service-worker-register'
import { SidebarProvider } from '@/components/ui/sidebar'
import { DashboardSidebar } from './_components'
import DashboardFooter from './_components/footer/dashboard-footer'
import DashboardHeader from './_components/header/dashboard-header'

type TProps = {
    children: React.ReactNode
    params : Promise<{locale: 'fa' | 'en'}>
}

/**
* * dashboard layout mapped
*  - wrapper
*  --- sidebar
*  --- page content wrapper
*  ------ header
*  ------ main content
*  ------ footer
*
*/

async function DashboardLayout({ children, params }: TProps) {
    const locale = (await params).locale
    return (
        <SidebarProvider className='flex flex-col lg:flex-row lg:h-100dvh w-full max-w-100dvw'>
            <DashboardSidebar locale={locale} />
            <div className='flex flex-col flex-1 overflow-hidden'>
                <DashboardHeader />
                <main className='p-2.5 flex-1'>{children}</main>
                <DashboardFooter />
            </div>
            <ServiceWorkerRegister />
        </SidebarProvider>
    )
}

export default DashboardLayout
