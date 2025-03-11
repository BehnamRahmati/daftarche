'use client'
import moment from 'moment'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import DashboardUserSkeleton from './dashboard-user-skeleton'
import { TUser } from '@/lib/types'
import { fetchUser } from '@/lib/user-helpers'
export default function DashboardUser({ user }: { user: TUser }) {
    const { data, isLoading } = useSWR(`/api/user/${encodeURIComponent(user.email)}`, fetchUser)
    const {locale} = useParams()

    if (isLoading || !data || !data.user) return <DashboardUserSkeleton />

    return (
        <div className='dashboard-user_con '>
            <div className='dashboard-user_info lg:shadow-md'>
                <div className='dashboard-user_avatar'>
                    <Image src={user.image!} height={64} width={64} alt={user.name!} className='h-full w-full rounded-full' />
                </div>
                <div className='flex flex-col lg:gap-2 '>
                    <div className='text-xl font-bold'>{user.name}</div>
                    <div className='w-5/6 truncate'>{user.email}</div>
                </div>
            </div>
            <div className='dashboard-user_login lg:shadow-md'>
                <div className='flex items-center justify-between'>
                    <div className='text-xl font-bold'>{locale === "en" ? "last login" : "آخرین بازدید"}</div>
                    <div className={`size-4 rounded-full ${data.user.isOnline ? 'bg-green-500' : 'bg-zinc-300'}`}></div>
                </div>

                <div className='mt-5'>{moment(data.user.lastActive).locale(locale!).fromNow()}</div>
            </div>
        </div>
    )
}
