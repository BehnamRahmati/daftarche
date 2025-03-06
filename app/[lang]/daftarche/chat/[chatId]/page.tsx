import ConversationContent from '@/ui/chat/ConversationContent';
import ConversationForm from '@/ui/chat/ConversationForm';
import React from 'react'

export default async function SingleChatPage({params} : {params : Promise<{chatId : string}>}) {
  const {chatId} = await params;

  return (
    <div className='flex flex-col size-full'>
      <ConversationContent chatId={chatId} />
      <ConversationForm chatId={chatId} />
    </div>
  )
}
