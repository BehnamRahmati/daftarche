import BackButton from './back-button'
// import FullScreenButton from './fullscreen-button'
import LocaleToggle from './toggle-locale'
import NotificationToggle from './toggle-notification'
import SidebarToggle from './toggle-sidebar'
import ModeToggle from './toggle-theme'

export default function DashboardHeader() {
    return (
        <header className='layout-header'>
            <div className='layout-header_group'>
                <SidebarToggle />
                <BackButton />
                {/* <FullScreenButton /> */}
            </div>

            <div className='layout-header_group'>
                <LocaleToggle />
                <ModeToggle />
                <NotificationToggle />
            </div>
        </header>
    )
}
