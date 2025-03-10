
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import { TUser } from '@/libs/clipboard.helpers'
import { AvatarFallback } from '@radix-ui/react-avatar'

import SidebarAccountDropmenu from './sidebar-account-dropmenu'
import WithUser from '../../with-user'

function DashboardSidebarFooter({ user }: { user: TUser }) {
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem className='flex items-center'>
                    {/* user info */}
                    <div className='flex w-44 items-center gap-2 overflow-hidden p-2'>
                        <Avatar>
                            <AvatarImage src={`${user.image}`} alt={`${user.name}`} />
                            <AvatarFallback>DF</AvatarFallback>
                        </Avatar>
                        <div className='w-5/6'>
                            <p className='text-xs'>{user.name}</p>
                            <p className='truncate text-xs'>{user.email}</p>
                        </div>
                    </div>
                    {/* account drop menu */}
                    <SidebarAccountDropmenu />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}

export default WithUser(DashboardSidebarFooter)