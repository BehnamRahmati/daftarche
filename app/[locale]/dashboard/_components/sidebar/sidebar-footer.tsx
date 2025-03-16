import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'

import { AvatarFallback } from '@radix-ui/react-avatar'

import WithUser from '../../with-user'
import { TUser } from '@/lib/types';

function DashboardSidebarFooter({ children, user }: { user: TUser; children: React.ReactNode }) {
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem className='flex items-center'>
                    {/* user info */}
                    <div className='flex items-center w-full gap-2 overflow-hidden'>
                        <Avatar className='size-7 ltr:ml-0.5 rtl:mr-0.5'>
                            <AvatarImage src={`${user.image}`} alt={`${user.name}`} />
                            <AvatarFallback>DF</AvatarFallback>
                        </Avatar>
                        <div className='w-5/6'>
                            <p className='text-xs'>{user.name}</p>
                            <p className='truncate text-xs'>{user.email}</p>
                        </div>
                    </div>
                    {/* account drop menu */}
                    {children}
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}

export default WithUser(DashboardSidebarFooter)
