'use client';

import { useAppSelector } from '@/hooks/hooks';
import { selectChat } from '@/libs/features/chats/chatSlice';
import { selectUser } from '@/libs/features/users/userSlice';
import React from 'react';
import Image from 'next/image';
export default function ConversationContent({ chatId }: { chatId: string }) {
	const { chats } = useAppSelector(selectChat);
	const { user } = useAppSelector(selectUser);
	const chat = chats.find((chat) => chat.id === chatId);
	const sender = chat?.participants.find((participant) => participant.userId !== user?.id);
	if (!chat || !sender) return <p>no chat found!</p>;

	return (
		<div className='flex-1 flex flex-col gap-5'>
			<div className='flex gap-5 items-center'>
				<div className='bg-zinc-200 rounded-full w-12 h-12'>
					<Image
						src={sender.user.image}
						height={48}
						width={48}
						alt={sender.user.name}
						className='w-full h-full rounded-full'
					/>
				</div>
				<h3>{sender.user.name}</h3>
			</div>
			<div className='flex-1 max-h-[calc(100%-5rem)] border rounded-3xl p-3 flex flex-col-reverse gap-2 justify-end overflow-y-scroll'>
				{chat.messages.map((message) => {
					return (
						<div
							key={message.id}
							className={` rounded-xl w-fit p-3 shrink-0 ${
								message.senderId === sender.user.id
									? 'bg-zinc-100'
									: 'ml-auto mr-0  bg-blue-50'
							}`}>
							{message.content}
						</div>
					);
				})}
			</div>
		</div>
	);
}
