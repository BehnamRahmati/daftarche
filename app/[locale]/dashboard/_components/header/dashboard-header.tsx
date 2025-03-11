import BackButton from './back-button'
import LocaleToggle from './toggle-locale'
import NotificationToggle from './toggle-notification'
import SidebarToggle from './toggle-sidebar'
import ModeToggle from './toggle-theme'

export default function DashboardHeader({ locale }: { locale: 'en' | 'fa' }) {
    return (
        <header className='layout-header'>
            <div className='layout-header_group'>
                <SidebarToggle />
                <BackButton locale={locale} />
            </div>

            <div className='layout-header_group'>
                <LocaleToggle />
                <ModeToggle />
                <NotificationToggle />
            </div>
        </header>
    )
}
