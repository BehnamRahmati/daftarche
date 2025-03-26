'use client'
import useConversations from '@/hooks/use-conversations'
import { TDictionary } from '@/lib/types'
import React from 'react'
import { TWithUserProp } from '../with-user'
import {
    LandingList,
    LandingListBody,
    LandingListContainer,
    LandingListHeader,
    LandingListHeaderItem,
    LandingListSkleton,
    LandingNoEntry,
} from './landing'
import LandingConversationItem from './landing-conversation-item'

type TProps = {
    dictionary: TDictionary
} & TWithUserProp

function LandingConversationList({ user, dictionary }: TProps) {
    const { conversations, isLoading } = useConversations(user.id)

    if (isLoading) return <LandingListSkleton count={4} section='conversation' />

    if (!conversations || conversations.length === 0)
        return <LandingNoEntry>{dictionary.dashboard.conversation.noEntry}</LandingNoEntry>

    return (
        <LandingListContainer className='lg:overflow-y-auto no-scrollbar'>
            <LandingList>
                <LandingListHeader>
                    <LandingListHeaderItem className='w-1/6 lg:w-2/12'>
                        {dictionary.dashboard.conversationList.avatar}
                    </LandingListHeaderItem>
                    <LandingListHeaderItem className='w-2/6 lg:w-3/12'>
                        {dictionary.dashboard.conversationList.name}
                    </LandingListHeaderItem>
                    <LandingListHeaderItem className='w-2/6 lg:w-5/12'>
                        {dictionary.dashboard.conversationList.message}
                    </LandingListHeaderItem>
                    <LandingListHeaderItem className='w-1/6 lg:w-2/12'>
                        {dictionary.dashboard.conversationList.visit}
                    </LandingListHeaderItem>
                </LandingListHeader>
                <LandingListBody>
                    {conversations.slice(0, 9).map(convers => (
                        <LandingConversationItem key={convers.id} conversation={convers} email={user.email} />
                    ))}
                </LandingListBody>
            </LandingList>
        </LandingListContainer>
    )
}

export default React.memo(LandingConversationList)
