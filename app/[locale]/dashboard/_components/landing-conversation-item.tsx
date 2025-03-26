import { TConversation, TParticipants } from '@/lib/types'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { LandingListBodyItem, LandingListBodyRow } from './landing'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useParams } from 'next/navigation'
function LandingConversationItem({ conversation, email }: { conversation: TConversation; email: string }) {
    
    const locale = useParams().locale as 'fa' | 'en'
    const sender = conversation.participants.find((pt: TParticipants) => pt.user.email !== email)
    const fromNow = moment(conversation.messages[0].createdAt).locale(locale).fromNow()

    return (
        <LandingListBodyRow key={conversation.id} className='p-1'>
            <Link
                href={`/${locale}/dashboard/conversation/${conversation.id}`}
                className='flex w-full items-center justify-between '
            >
                <LandingListBodyItem className='w-1/6 lg:w-2/12 p-0'>
                    <Avatar
                        className={`size-10 rounded-lg border-2 bg-zinc-300 ${sender?.user.isOnline ? 'border-green-500' : 'border-zinc-300'}`}
                    >
                        <AvatarImage src={sender?.user.image || '#'} alt={sender?.user.name} />
                        <AvatarFallback>DF</AvatarFallback>
                    </Avatar>
                </LandingListBodyItem>
                <LandingListBodyItem className='w-2/6 lg:w-3/12'>{sender?.user.name}</LandingListBodyItem>
                <LandingListBodyItem className='w-2/6 lg:w-5/12 truncate'>
                    {conversation.messages[0] ? conversation.messages[0].content : 'no content'}
                </LandingListBodyItem>
                <LandingListBodyItem className='w-1/6 lg:w-2/12 truncate'>
                    {conversation.messages[0] ? fromNow : 'no content'}
                </LandingListBodyItem>
            </Link>
        </LandingListBodyRow>
    )
}

export default React.memo(LandingConversationItem)
