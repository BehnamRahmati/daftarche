'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { markMessagesRead } from '@/lib/conversation-helpers'
import { TMessage, TUser } from '@/lib/types'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CgSpinnerAlt } from 'react-icons/cg'
import useSWRInfinite from 'swr/infinite'
import { ConversationContainer, ConversationList } from './conversation'
import { groupMessagesByDate } from './helpers'
import MessageListByDate from './message-list-by-date'

type MessageResponse = {
    messages: TMessage[]
    nextCursor: string | null
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function MessagesList({ conversationId, user }: { conversationId: string; user: TUser }) {
    const containerRef = useRef<HTMLDivElement | null>(null)

    const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null)

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
    const isEmpty = data?.[0]?.messages.length === 0
    const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.nextCursor)
    const locale = useParams().locale as 'fa' | 'en'
    const hasInitialScroll = useRef(false)

    useEffect(() => {
        markMessagesRead({ conversationId, email: user.email })
    }, [messages, conversationId, user.email])

    // Scroll handler with position preservation
    const handleScroll = useCallback(() => {
        if (!containerRef.current) return

        const { scrollTop } = containerRef.current
        if (scrollTop === 0 && !isLoading && !isReachingEnd) {
            setPrevScrollHeight(containerRef.current.scrollHeight)
            setSize(size + 1)
        }
    }, [isLoading, isReachingEnd, setSize, size])

    // Scroll position adjustment
    useEffect(() => {
        if (containerRef.current) {
            const isNearBottom =
                containerRef.current.scrollHeight - containerRef.current.scrollTop < containerRef.current.clientHeight + 200

            if (isNearBottom) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight
                return
            }
            if (prevScrollHeight) {
                const newScrollHeight = containerRef.current.scrollHeight
                containerRef.current.scrollTop = newScrollHeight - prevScrollHeight
            }
        }
    }, [messages, prevScrollHeight])

    // Auto-scroll to bottom on initial load
    useEffect(() => {
        if (containerRef.current && messages.length > 0 && !hasInitialScroll.current) {
            requestAnimationFrame(() => {
                if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight
                    hasInitialScroll.current = true
                }
            })
        }
    }, [messages.length]) // Only trigger when message count changes

    if (error) return <div className='flex-1'>Error loading messages.</div>
    if (isLoading) return <MessagesListSkeleton />

    const messsagesGroupedByDate = groupMessagesByDate(messages, locale)

    return (
        <ConversationContainer>
            <ConversationList ref={containerRef} onScroll={handleScroll} className='relative'>
                <div className='bg-amber-50 dark:bg-accent mb-2 rounded-lg p-2 w-3/4 lg:w-1/2 text-center mx-auto text-xs lg:text-sm'>
                    Messages are end-to-end encrypted. No one outside of this chat, not even Daftarche, can read or listen to
                    them.
                </div>
                <div className='flex-1 min-h-5'></div>
                {/* Loading indicator at TOP */}
                {isLoading && (
                    <div className='absolute top-10 left-1/2 text-xl text-red-500'>
                        <CgSpinnerAlt />
                    </div>
                )}
                {isReachingEnd && <div className='p-2 bg-accent text-center w-fit mx-auto rounded-lg'>No older messages</div>}
                {messages.length ? (
                    messsagesGroupedByDate.map((obj, index) => <MessageListByDate key={'dtobj' + index} obj={obj} />)
                ) : (
                    <p>no message found</p>
                )}
            </ConversationList>
        </ConversationContainer>
    )
}

function MessagesListSkeleton() {
    return (
        <div className='h-[calc(100dvh-13rem)] lg:h-full max-h-[calc(100%-13)] lg:max-h-[calc(100dvh-14rem)]'>
            <Skeleton className='w-full h-full' />
        </div>
    )
}
