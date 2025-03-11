'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { fetchConversation } from '@/lib/conversation-helpers';
import useSWR from 'swr'

export default function SenderInfo({ conversationId, userEmail }: { conversationId: string; userEmail: string }) {
    const { data, isLoading } = useSWR(conversationId, fetchConversation)

    if (isLoading || !data) return <p>loading</p>
    const sender = data.conversation.participants.find(x => x.user.email !== userEmail)

    return (
        <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <Avatar className={`size-7 border-4 ${sender?.user.isOnline ? 'border-green-500' : 'border-zinc-300'}`}>
                    <AvatarImage src={sender?.user.image} alt={`${sender?.user.name}`} />
                    <AvatarFallback>DF</AvatarFallback>
                </Avatar>
                <div className=''>{sender?.user.name}</div>
            </div>

            <div className=''>{sender?.user.isOnline ? 'online' : 'offline'}</div>
        </div>
    )
}
