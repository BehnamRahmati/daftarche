'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSidebar } from '@/components/ui/sidebar'
import { fetchUnreadMessages, markMessagesRead, sendPushNotification } from '@/lib/conversation-helpers'
import { TMessage, TUser } from '@/lib/types'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiArrowLeft, FiArrowRight, FiBell } from 'react-icons/fi'
import { GoScreenFull } from 'react-icons/go'
import { IoLanguageOutline } from 'react-icons/io5'
import { LuPanelLeft, LuPanelRight } from 'react-icons/lu'
import { changeLocale, goFullscreen, requestNotificationPermission } from './helpers'

function SelectThemeDropdown() {
    const { theme, setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                    <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                    <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                    <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuCheckboxItem checked={theme === 'light'} onCheckedChange={() => setTheme('light')}>
                    Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={theme === 'dark'} onCheckedChange={() => setTheme('dark')}>
                    Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={theme === 'system'} onCheckedChange={() => setTheme('system')}>
                    System
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function SelectLocaleDropdown() {
    const pathname = usePathname()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                    <IoLanguageOutline className='text-sm lg:text-xl' />
                    <span className='sr-only'>switch locale</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem>
                    <Link className='w-full' href={`/${changeLocale(pathname, 'en')}`}>
                        English
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link className='w-full' href={`/${changeLocale(pathname, 'fa')}`}>
                        Farsi
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function SidebarToggleButton() {
    const { state, toggleSidebar } = useSidebar()
    return (
        <Button variant={'outline'} size={'icon'} onClick={toggleSidebar}>
            {state === 'expanded' ? <LuPanelLeft /> : <LuPanelRight />}
            <span className='sr-only'>Toggle Sidebar</span>
        </Button>
    )
}

function NotificationDropdown({ user }: { user: TUser }) {
    const [notifications, setNotification] = useState<TMessage[] | []>([])
    useEffect(() => {
        if (Notification.permission !== 'denied') {
            sendPushNotification(user.email)
        }
        const notifIntervals = setInterval(() => {
            fetchUnreadMessages(user.email).then(notifs => notifs && setNotification(notifs))
        }, 30000)
        return () => {
            clearInterval(notifIntervals)
        }
    }, [user.email])
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'outline'} size={'icon'} className='relative' onClick={() => setNotification([])}>
                        <FiBell />
                        {notifications.length !== 0 && (
                            <span className='absolute -top-1 -right-1 w-3 h-3 flex items-center justify-center rounded-full text-[9px] bg-red-500 z-10'>
                                {notifications.length}
                            </span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {notifications.length !== 0 ? (
                        notifications.map(notif => (
                            <NotificationDropdownItem email={user.email} key={notif.id} notification={notif} />
                        ))
                    ) : (
                        <DropdownMenuItem>You have no notification</DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            <div
                onClick={() =>
                    (async () => {
                        await requestNotificationPermission()
                    })()
                }
            ></div>
        </>
    )
}
function NotificationDropdownItem({ notification, email }: { notification: TMessage; email: string }) {
    const locale = useParams().locale
    useEffect(() => {
        markMessagesRead({ conversationId: notification.conversationId, email })
    }, [notification, email])

    return (
        <DropdownMenuItem className='max-w-44 truncate text-xs md:text-sm'>
            <Link href={`/${locale}/dashboard/conversation/${notification.conversationId}`}>
                {notification.sender.name} : {notification.content}
            </Link>
        </DropdownMenuItem>
    )
}

function BackButton() {
    const router = useRouter()
    const locale = useParams().locale as 'fa' | 'en'
    return (
        <Button variant={'outline'} size={'icon'} onClick={() => router.back()}>
            {locale === 'fa' ? <FiArrowRight /> : <FiArrowLeft />}
            <span className='sr-only'>go back</span>
        </Button>
    )
}

function FullScreenButton() {
    return (
        <Button variant={'outline'} size={'icon'} onClick={goFullscreen}>
            <GoScreenFull />
            <span className='sr-only'>go back</span>
        </Button>
    )
}

export { BackButton, FullScreenButton, NotificationDropdown, SelectLocaleDropdown, SelectThemeDropdown, SidebarToggleButton }
