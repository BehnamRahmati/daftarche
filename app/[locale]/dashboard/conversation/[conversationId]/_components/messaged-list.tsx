'use client'

import { fetchConversation } from '@/lib/conversation-helpers'
import { TMessage, TUser } from '@/lib/types'
import { useEffect, useRef } from 'react'
import useSWR from 'swr'
import ContactMessage from './contact-message'
import SenderMessage from './sender-message'
import { Skeleton } from '@/components/ui/skeleton'

const createBubbles = (messages: TMessage[]) => {
    let tempArr: TMessage[] = []
    const newArr: TMessage[][] = []

    // Iterate over the original array
    messages.forEach((item, index) => {
        // Check if this is the first item or matches the previous item's content
        if (index === 0 || item.senderId === messages[index - 1].senderId) {
            tempArr.push(item)
        } else {
            // When the content changes, push the current group to `newArr`
            newArr.push(tempArr)
            // Start a new group
            tempArr = [item]
        }
    })

    // Push the final tempArr to `newArr` (handles the last group in the array)
    if (tempArr.length > 0) {
        newArr.push(tempArr)
    }

    return newArr
}

export default function MessagesList({ conversationId, user }: { conversationId: string; user: TUser }) {
    const bottomOfMessagesRef = useRef<HTMLDivElement | null>(null)
    const { data, isLoading } = useSWR(`/api/conversation/${conversationId}`, fetchConversation, {
        refreshInterval: 1000,
    })

    useEffect(() => {
        bottomOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [data?.messages])

    if (isLoading || !data) return <MessagesListSkeleton />

    const messages = createBubbles(data.messages)

    return (
        <div className='mb-1 flex-1 h-full rounded-lg border border-accent p-2'>
            <div className='flex flex-col h-[calc(100dvh-13rem)] lg:h-full max-h-[calc(100dvh-13rem)] lg:max-h-[calc(100dvh-21.5rem)] gap-1 overflow-x-hidden overflow-y-auto no-scrollbar'>
                <div className="flex-1 min-h-5"></div>
                <div className='bg-amber-50 dark:bg-amber-950 mb-2 rounded-lg p-2 w-3/4 lg:w-1/2 text-center mx-auto text-xs lg:text-sm'>
                    Messages are end-to-end encrypted. No one outside of this chat, not even Daftarche, can read or listen to
                    them.
                </div>
                {data.messages.length ? (
                    messages.map((messageBubble, index) => (
                        <div key={'mb' + index} className='message-bubble flex flex-col'>
                            {messageBubble.map(message => {
                                const sender = message.sender.email === user.email
                                if (sender) {
                                    return (
                                        <SenderMessage
                                            key={message.id}
                                            isFirst={messageBubble[0].id === message.id}
                                            message={message}
                                        />
                                    )
                                }
                                return (
                                    <ContactMessage
                                        key={message.id}
                                        isFirst={messageBubble[0].id === message.id}
                                        message={message}
                                    />
                                )
                            })}
                        </div>
                    ))
                ) : (
                    <p>no message found</p>
                )}

                <div ref={bottomOfMessagesRef}></div>
            </div>
        </div>
    )
}


function MessagesListSkeleton() {
    return (
        <div className="h-full max-h-[calc(100dvh-13rem)] lg:max-h-[calc(100dvh-21.5rem)]">
            <Skeleton className='w-full h-full' />
        </div>
    )
}