'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { fetchConversation } from '@/lib/conversation-helpers'
import { TUser } from '@/lib/types'
import { useEffect, useRef } from 'react'
import useSWR from 'swr'

export default function MessagesList({ conversationId, user }: { conversationId: string; user: TUser }) {
    const bottomOfMessagesRef = useRef<HTMLDivElement | null>(null)
    const { data, isLoading } = useSWR(`/api/conversation/${conversationId}`, fetchConversation, {
        refreshInterval: 1000,
    })

    useEffect(() => {
        bottomOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [data?.messages])

    if (isLoading || !data) return <p className='h-[calc(100dvh-20rem)] mb-2 p-2'>loading</p>

    return (
        <div className='mb-1 flex-1 h-full rounded-lg border border-accent p-2'>
            <div className='h-full max-h-[calc(100dvh*3/4)] lg:max-h-[calc(100dvh-21.5rem)] gap-1 overflow-y-auto no-scrollbar'>
                {data.messages.length ? (
                    data.messages.map(message => {
                        const sender = message.sender.email === user.email

                        return (
                            <div
                                key={message.id}
                                className={sender ? 'shrink-0 mt-1' : 'shrink-0 mt-1 place-items-end justify-items-end '}
                            >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className='w-fit block'>
                                            <p
                                                className={`${sender ? 'dark:bg-green-950 bg-green-50' : 'bg-accent'} w-fit rounded-lg p-2`}
                                            >
                                                {message.content}
                                            </p>
                                        </TooltipTrigger>
                                        <TooltipContent>{message.sender.name}</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )
                    })
                ) : (
                    <p>no message found</p>
                )}
                <div ref={bottomOfMessagesRef}></div>
            </div>
        </div>
    )
}
