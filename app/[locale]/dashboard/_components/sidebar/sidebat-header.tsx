import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { SlNotebook } from 'react-icons/sl'

export default function DashboardSidebarHeader() {
    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className='hover:bg-transparent!'>
                        <div className='flex w-full items-center'>
                            <SlNotebook />
                            <p className='text-xl font-bold'>Daftarche</p>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}
