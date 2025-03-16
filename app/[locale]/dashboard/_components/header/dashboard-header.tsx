
import WithUser, { TWithUserProp } from '../../with-user'
import { BackButton, NotificationDropdown, SelectLocaleDropdown, SelectThemeDropdown, SidebarToggleButton } from './header'

function DashboardHeader({ user }:TWithUserProp) {
    return (
        <header className='flex items-center justify-between border-b border-b-sidebar-border py-1.5 px-2.5 bg-sidebar'>
            <div className='layout-header_group'>
                <SidebarToggleButton />
                <BackButton />
            </div>

            <div className='layout-header_group'>
                <SelectLocaleDropdown />
                <SelectThemeDropdown />
                <NotificationDropdown user={user} />
            </div>
        </header>
    )
}

export default WithUser(DashboardHeader)
