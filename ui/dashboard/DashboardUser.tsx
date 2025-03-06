'use client';

import React from 'react';
import { useAppSelector } from '@/hooks/hooks';
import { selectUser } from '@/libs/features/users/userSlice';
import Image from 'next/image';

export default function DashboardUser() {
    const {user} = useAppSelector(selectUser)

    if(!user) {
        return <p>user is not authenticated!</p>
    }

	return (
		<div className='flex flex-col w-3/5'>
			<div className='flex gap-5 p-5 border border-zinc-200 dark:border-[var(--secondary-heavy)] rounded-3xl bg-white dark:bg-[var(--foreground)]'>
				<div className='bg-zinc-200 rounded-full w-16 h-16 shrink-0'>
                    <Image src={user.image} height={64} width={64} alt={user.name} className='w-full h-full rounded-full' />
                </div>
				<div className='flex flex-col gap-2'>
					<div className='font-bold text-xl'>{user.name}</div>
					<div className='truncate w-5/6'>{user.email}</div>
				</div>
			</div>
			<div className='p-5 border border-zinc-200 dark:border-[var(--secondary-heavy)] rounded-3xl bg-white dark:bg-[var(--foreground)] mt-5'>
				<div className='font-bold text-xl'>last login</div>
				<div className='mt-5'>yesterday 12 pm</div>
			</div>
		</div>
	);
}
