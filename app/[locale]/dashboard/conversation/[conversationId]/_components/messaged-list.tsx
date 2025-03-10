'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { fetchConversation, TUser } from '@/libs/clipboard.helpers'
import { useEffect, useRef } from 'react';
import useSWR from 'swr'

export default function MessagesList({ conversationId, user }: { conversationId: string; user: TUser }) {
    const bottomOfMessagesRef = useRef<HTMLDivElement | null>(null);
    const { data, isLoading } = useSWR(conversationId, fetchConversation , {
        refreshInterval : 1000
    })

    useEffect(() => {
        bottomOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [data?.messages]);
    
      if (isLoading || !data) return <p className='h-[calc(100dvh-20rem)] mb-2 p-2'>loading</p>

    return (
        <ScrollArea className='h-[calc(100dvh-20rem)] mb-2 p-2'>
            <div className='flex h-full flex-col justify-end gap-1'>
                {data.messages.length ? (
                    data.messages.map(message => {
                        const sender = message.sender.email === user.email

                        return (
                            <div key={message.id} className={sender ? 'place-items-end' : ''}>
                                <div className=''>
                                    <p>{message.sender.name} :</p>
                                    <p className='bg-accent w-fit rounded-lg p-2'>{message.content}</p>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <p>no message found</p>
                )}
                <div ref={bottomOfMessagesRef}></div>
            </div>
        </ScrollArea>
    )
}
