'use client';

import { useAppSelector } from '@/hooks/hooks';
import { selectChat } from '@/libs/features/chats/chatSlice';
import React from 'react';

import DashboardChatItem from './DashboardChatItem';

export default function DashboardChats() {
    const {chats} = useAppSelector(selectChat)
    
    
    if(!chats || !chats.length) {
        return <p>You have no chats!</p>
    }
	return (
		<div className='flex flex-col gap-5 p-5'>
			{chats.map((chat) => (
				<DashboardChatItem chat={chat} key={chat.id} />
			))}
		</div>
	);
} 
