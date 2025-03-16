import { Sidebar, SidebarSeparator } from '@/components/ui/sidebar'
import { getDictionary } from '@/i18n/dictionaries'
import { FiClipboard, FiFile, FiMessageCircle } from 'react-icons/fi'
import { LuLayoutGrid } from 'react-icons/lu'
import SidebarAccountDropmenu from './sidebar-account-dropmenu'
import DashboardSidebarFooter from './sidebar-footer'
import DashboardSidebarHeader from './sidebar-header'
import DashboardSidebarMenu from './sidebar-menu'
import DashboardSidebarLink from './client-sidebar-menu-item'

type TProps = {
    locale: 'en' | 'fa'
}

export default async function DashboardSidebar({ locale }: TProps) {
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
        <Sidebar variant='sidebar' side={locale === 'en' ? 'left' : 'right'} collapsible='icon'>
            {/* sidebar header */}
            <DashboardSidebarHeader locale={locale} />
            <SidebarSeparator className='mx-0' />

            {/* sidebar menu */}
            <DashboardSidebarMenu locale={locale}>
                {links.map(link => (
                    <DashboardSidebarLink key={link.title} icon={link.icon} link={link.link} title={link.title} />
                ))}
            </DashboardSidebarMenu>

            {/* sidebar footer */}
            <SidebarSeparator className='mx-0' />
            <DashboardSidebarFooter>
                <SidebarAccountDropmenu locale={locale} />
            </DashboardSidebarFooter>
        </Sidebar>
    )
}
