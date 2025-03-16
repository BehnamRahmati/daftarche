import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenuAction } from '@/components/ui/sidebar'
import Link from 'next/link'
import { FiMoreVertical, FiUser } from 'react-icons/fi'
import SignoutButton from './client-signout-button'

async function SidebarAccountDropmenu({ locale }: { locale: 'fa' | 'en' }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={`py-2.5 shrink-0 ${locale === 'fa' && 'right-auto left-1'}`}>
                <SidebarMenuAction>
                    <FiMoreVertical />
                </SidebarMenuAction>
            </DropdownMenuTrigger>

            <DropdownMenuContent side={locale === 'fa' ? 'left' : 'right'} sideOffset={20} align='end'>
                <DropdownMenuItem>
                    <Link href={`/profile`} className='flex w-full justify-start gap-2'>
                        <FiUser />
                        <p>Profile</p>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <SignoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SidebarAccountDropmenu
