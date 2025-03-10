import React from 'react'
import Image from 'next/image'
import { Session } from 'next-auth'
export default async function DashboardUser({session}: {session: Session  | null}) {

    if (!session || !session.user) return <p>user is not authenticated</p>

    const { user } = session

    return (
        <div className='dashboard-user_con'>
            <div className='dashboard-user_info'>
                <div className='dashboard-user_avatar'>
                    <Image
                        src={user.image!}
                        height={64}
                        width={64}
                        alt={user.name!}
                        className='h-full w-full rounded-full'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-xl font-bold'>{user.name}</div>
                    <div className='w-5/6 truncate'>{user.email}</div>
                </div>
            </div>
            <div className='dashboard-user_login'>
                <div className='text-xl font-bold'>last login</div>
                <div className='mt-5'>yesterday 12 pm</div>
            </div>
        </div>
    )
}
