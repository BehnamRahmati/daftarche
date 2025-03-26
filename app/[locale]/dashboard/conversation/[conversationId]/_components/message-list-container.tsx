import { markMessagesRead } from '@/lib/conversation-helpers'
import { TMessage } from '@/lib/types'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CgSpinnerAlt } from 'react-icons/cg'
import { ConversationList } from './conversation'
import { groupMessagesByDate } from './helpers'
import MessageListByDate from './message-list-by-date'

type TProps = {
    messages: TMessage[]
    isLoading: boolean
    isReachingEnd: boolean | undefined
    size: number
    setSize: any
    conversationId: string
    email: string
}

export default function MessageListContainer({
    messages,
    isLoading,
    isReachingEnd,
    size,
    setSize,
    conversationId,
    email,
}: TProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const locale = useParams().locale as 'fa' | 'en'
    const messsagesGroupedByDate = groupMessagesByDate(messages, locale)
    const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null)

    // Scroll handler with position preservation
    const handleScroll = useCallback(() => {
        if (!containerRef.current) return

        const { scrollTop } = containerRef.current
        if (scrollTop === 0 && !isLoading && !isReachingEnd) {
            setPrevScrollHeight(containerRef.current.scrollHeight)
            setSize(size + 1)
        }
    }, [isLoading, isReachingEnd, setSize, size])

    const hasInitialScroll = useRef(false)

    useEffect(() => {
        markMessagesRead({ conversationId, email })
    }, [messages, conversationId, email])

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

    return (
        <ConversationList ref={containerRef} onScroll={handleScroll} className='relative'>
            <div className='bg-amber-50 dark:bg-accent mb-2 rounded-lg p-2 w-3/4 lg:w-1/2 text-center mx-auto text-xs lg:text-sm'>
                Messages are end-to-end encrypted. No one outside of this chat, not even Daftarche, can read or listen to them.
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
                <div className='p-2 bg-accent text-center w-fit mx-auto rounded-lg'>
                    start the conversation by sending first message
                </div>
            )}
        </ConversationList>
    )
}
