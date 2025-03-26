'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { TMessage, TUser } from '@/lib/types'
import { useMemo } from 'react'
import useSWRInfinite from 'swr/infinite'
import { ConversationContainer } from './conversation'
import MessageListContainer from './message-list-container'

type MessageResponse = {
    messages: TMessage[]
    nextCursor: string | null
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function MessagesList({ conversationId, user }: { conversationId: string; user: TUser }) {
    // * The getKey function builds the URL for each page.
    // It returns null when no further page is available.
    const getKey = (pageIndex: number, previousPageData: MessageResponse | null) => {
        const PAGE_LIMIT = 10
        // If previous page exists but has no nextCursor, we've reached the end.
        if (previousPageData && previousPageData.nextCursor === null) return null

        if (pageIndex === 0) {
            return `/api/conversation/${conversationId}?limit=${PAGE_LIMIT}`
        }
        return `/api/conversation/${conversationId}?limit=${PAGE_LIMIT}&cursor=${previousPageData?.nextCursor}`
    }

    const { data, error, size, setSize } = useSWRInfinite<MessageResponse>(getKey, fetcher, {
        revalidateOnFocus: false,
        refreshInterval: 2000,
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            // Don't retry on 400 errors
            if (error.status === 400) return
            // Retry others up to 3 times
            if (retryCount >= 3) return
            setTimeout(() => revalidate({ retryCount }), 5000)
        },
    })

    // * Flatten all pages into one array of messages.
    // Flatten and reverse messages for chronological display
    const messages = useMemo(() => (data ? data.flatMap(page => page.messages).reverse() : []), [data])

    const isLoading = !data && !error

    if (error) return <div className='flex-1'>Error loading messages.</div>
    if (isLoading) return <MessagesListSkeleton />

    const isEmpty = data?.[0]?.messages.length === 0
    const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.nextCursor)

    return (
        <ConversationContainer>
            <MessageListContainer
                conversationId={conversationId}
                email={user.email}
                isLoading={isLoading}
                isReachingEnd={isReachingEnd}
                messages={messages}
                setSize={setSize}
                size={size}
            />
        </ConversationContainer>
    )
}

function MessagesListSkeleton() {
    return (
        <div className='h-[calc(100dvh-12rem)] lg:h-[calc(100dvh-13rem)]'>
            <Skeleton className='w-full h-full' />
        </div>
    )
}
