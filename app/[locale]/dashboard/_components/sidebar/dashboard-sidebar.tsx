import { Sidebar, SidebarSeparator } from '@/components/ui/sidebar'
import { getDictionary } from '@/i18n/dictionaries'
import { FiClipboard, FiFile, FiMessageCircle } from 'react-icons/fi'
import { LuLayoutGrid } from 'react-icons/lu'
import DashboardSidebarFooter from './sidebar-footer'
import DashboardSidebarMenu from './sidebar-menu'
import DashboardSidebarHeader from './sidebat-header'

type TProps = {
    locale: 'en' | 'fa'
}

export default async function DashboardSidebar({ locale}: TProps) {
    const dictionary = await getDictionary(locale)

    const links = [
        {
            title: dictionary.dashboard.title,
            link: `/${locale}/dashboard`,
            icon: <LuLayoutGrid />,
        },
        {
            title: dictionary.clipboard.title,
            link: `/${locale}/dashboard/clipboard`,
            icon: <FiClipboard />,
        },
        {
            title: dictionary.conversation.title,
            link: `/${locale}/dashboard/conversation`,
            icon: <FiMessageCircle />,
        },
        {
            title: dictionary.file.title,
            link: `/${locale}/dashboard/file`,
            icon: <FiFile />,
        },
    ]

    return (
        <Sidebar variant='floating' side={locale === 'en' ? 'left' : 'right'} collapsible='icon'>
            {/* sidebar header */}
            <DashboardSidebarHeader />
            <SidebarSeparator className='mx-0' />

            {/* sidebar menu */}
            <DashboardSidebarMenu links={links} />

            {/* sidebar footer */}
            <DashboardSidebarFooter />
        </Sidebar>
    )
}
