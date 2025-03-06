'use client';

import { TConversation } from '@/types/api';
import React from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';
import { selectUser } from '@/libs/features/users/userSlice';
import Moment from 'react-moment';
import Link from 'next/link';
import { generateLocalePath } from '@/app/i18n';
import { selectLang } from '@/libs/features/global/langSlice';

export default function DashboardChatItem({ chat }: { chat: TConversation }) {
    const { user } = useAppSelector(selectUser)
    const participant = chat.participants.find(participant => participant.userId !== user?.id)
	const lang = useAppSelector(selectLang)

    if(!participant) return <p>no participants</p>

	return (
		<Link href={generateLocalePath(lang, `/daftarche/chat/${chat.id}`)} className='flex w-full items-center justify-between even:bg-zinc-100 dark:even:bg-[var(--background)] p-2 rounded-3xl'>
			<div className='w-2/12'>
				<div className='bg-zinc-200 rounded-full w-12 h-12'>
					<Image src={participant.user.image} height={48} width={48} alt={participant.user.name} className='w-full h-full rounded-full' />
				</div>
			</div>
			<div className='w-3/12'>{participant.user.name}</div>
			<div className='w-5/12 truncate'>{chat.messages[0].content} </div>
			<div className='w-2/12'><Moment fromNow>{chat.messages[0].createdAt}</Moment></div>
		</Link>
	);
}
