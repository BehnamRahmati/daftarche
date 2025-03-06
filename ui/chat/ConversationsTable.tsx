"use client"

import { useAppSelector } from '@/hooks/hooks'
import { selectChat } from '@/libs/features/chats/chatSlice'
import React from 'react'
import DashboardChatItem from '../dashboard/DashboardChatItem';

export default function ConversationsTable() {
  const {chats} = useAppSelector(selectChat)
  console.warn(chats);
  
  if(!chats || !chats.length) return <p>no conversation yet!</p>
  return (
    <div className='flex flex-col gap-1'>
      {
        chats.map(chat => <DashboardChatItem chat={chat} key={chat.id} />)
      }
    </div>
  )
}
