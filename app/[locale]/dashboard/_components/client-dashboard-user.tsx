'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { fetchUser } from '@/lib/user-helpers'
import moment from 'moment'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import DashboardUserSkeleton from './landing'
import LandingUsage from './landing-usage'

export default function DashboardUser({ id }: { id: string }) {
    const { data: user, isLoading, error } = useSWR(`/api/user/${id}`, fetchUser)
    const { locale } = useParams()

    if (error) return <p>error</p>

    if (isLoading || !user) return <DashboardUserSkeleton />

    return (
        <div className='flex size-full flex-col gap-2.5 justify-between'>
            <div className='flex items-center gap-2 lg:gap-2.5 rounded-lg overflow-hidden p-2.5 border bg-sidebar border-sidebar-border'>
                <Avatar className={`size-12 rounded-lg`}>
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>DF</AvatarFallback>
                </Avatar>
                <div className='flex flex-col flex-1'>
                    <div className='text-xl font-bold'>{user.name}</div>
                    <div className='w-10/12 truncate font-light'>{user.email}</div>
                </div>
            </div>
            <div className='flex-1 rounded-lg border bg-sidebar border-sidebar-border p-2.5'>
                <div className='flex justify-between items-center mb-2.5'>
                    <div className='flex items-center gap-2.5'>
                        <div className='text-base lg:text-xl font-bold'>
                            {locale === 'en' ? 'last login :' : 'آخرین بازدید :'}
                        </div>
                        <div className='text-xs lg:text-sm'>{moment(user.lastActive).locale(locale!).fromNow()}</div>
                    </div>
                    <div className={`size-4 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-zinc-300'}`}></div>
                </div>
                <LandingUsage id={id} />
            </div>
        </div>
    )
}
