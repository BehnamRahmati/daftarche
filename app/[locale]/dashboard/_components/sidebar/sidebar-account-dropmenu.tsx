import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenuAction } from '@/components/ui/sidebar'
import Link from 'next/link'
import { FiLogOut, FiMoreVertical, FiUser } from 'react-icons/fi'

export default function SidebarAccountDropmenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='py-3'>
                <SidebarMenuAction>
                    <FiMoreVertical />
                </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='right' sideOffset={20} align='end'>
                <DropdownMenuItem>
                    <Link href={`/profile`} className='flex w-full justify-start gap-2'>
                        <FiUser />
                        <p>Profile</p>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <button type='button' className='flex w-full cursor-pointer justify-start gap-2'>
                        <FiLogOut />
                        <p>log out</p>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
