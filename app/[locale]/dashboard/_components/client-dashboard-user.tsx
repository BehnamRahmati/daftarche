'use client'
import { TUser } from '@/lib/types'
import { fetchUser } from '@/lib/user-helpers'
import moment from 'moment'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import DashboardUserSkeleton from './landing'
export default function DashboardUser({ user }: { user: TUser }) {
    const { data, isLoading } = useSWR(`/api/user/${encodeURIComponent(user.email)}`, fetchUser)
    const { locale } = useParams()

    if (isLoading || !data || !data.user) return <DashboardUserSkeleton />

    return (
        <div className='flex size-full flex-col gap-2.5 justify-between'>
            <div className='flex gap-2 lg:gap-2.5 rounded-lg overflow-hidden p-2.5 border bg-sidebar border-sidebar-border'>
                <div className='size-12 shrink-0 rounded-full bg-zinc-200'>
                    <Image src={user.image!} height={64} width={64} alt={user.name!} className='h-full w-full rounded-full' />
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='text-xl font-bold'>{user.name}</div>
                    <div className='w-10/12 truncate'>{user.email}</div>
                </div>
            </div>
            <div className='flex items-center justify-between rounded-lg border bg-sidebar border-sidebar-border p-2.5'>
                <div className='flex items-center gap-2.5'>
                    <div className='text-base lg:text-xl font-bold'>{locale === 'en' ? 'last login :' : 'آخرین بازدید :'}</div>
                    <div className='text-xs lg:text-sm'>{moment(data.user.lastActive).locale(locale!).fromNow()}</div>
                </div>
                <div className={`size-4 rounded-full ${data.user.isOnline ? 'bg-green-500' : 'bg-zinc-300'}`}></div>
            </div>
            <div className='flex items-center justify-between rounded-lg border bg-sidebar border-sidebar-border p-2.5'>
                <div className='text-base lg:text-xl font-bold'>{locale === 'en' ? 'last login :' : 'آخرین بازدید :'}</div>
            </div>
        </div>
    )
}
