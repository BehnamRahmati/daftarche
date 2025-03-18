'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchConversation } from '@/lib/conversation-helpers'
import useSWR from 'swr'

export default function SenderInfo({ conversationId, userEmail }: { conversationId: string; userEmail: string }) {
    const { data, isLoading } = useSWR(`/api/conversation/${conversationId}`, fetchConversation)

    if (isLoading || !data) return <SenderInfoSkeleton />
    const sender = data.conversation.participants.find(x => x.user.email !== userEmail)

    return (
        <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <Avatar className={`size-10 bg-zinc-300 rounded-lg border-2 ${sender?.user.isOnline ? 'border-green-500' : 'border-zinc-300'}`}>
                    <AvatarImage src={sender?.user.image} alt={`${sender?.user.name}`} />
                    <AvatarFallback>DF</AvatarFallback>
                </Avatar>
                <div className='font-light'>{sender?.user.name}</div>
            </div>

            <div className='font-light'>{sender?.user.isOnline ? 'online' : 'offline'}</div>
        </div>
    )
}

function SenderInfoSkeleton() {
    return (
        <div>
            <div className='flex items-center justify-between gap-2'>
                <Skeleton className='size-9 rounded-full' />
                <div className='w-2/5'>
                    <Skeleton className='h-5 w-full' />
                </div>
            </div>
        </div>
    )
}
