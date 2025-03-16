import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getDictionary } from '@/i18n/dictionaries'
import { fetchAllConversations } from '@/lib/conversation-helpers'
import { TDictionary, TParticipants, TUser } from '@/lib/types'
import moment from 'moment'
import Link from 'next/link'
import {
    LandingList,
    LandingListBody,
    LandingListBodyItem,
    LandingListBodyRow,
    LandingListContainer,
    LandingListHeader,
    LandingListHeaderItem,
} from './landing'

type TProps = {
    user: TUser
    locale: 'fa' | 'en'
}

async function LandingConversationList({ user, locale }: TProps) {
    const conversations = await fetchAllConversations(user.email)
    const dictionary: TDictionary = await getDictionary(locale)
    return (
        <LandingListContainer>
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
                    {conversations.length ? (
                        conversations.map(convers => {
                            const sender = convers.participants.find((pt: TParticipants) => pt.user.email !== user.email)
                            const fromNow = moment(convers.messages[0].createdAt).locale(locale).fromNow()
                            return (
                                <LandingListBodyRow key={convers.id}>
                                    <Link href={`/${locale}/dashboard/conversation/${convers.id}`} className='flex w-full items-center justify-between '>
                                        <LandingListBodyItem className='w-1/6 lg:w-2/12 py-0'>
                                            <Avatar
                                                className={`size-8 lg:size-10 border-4 ${sender?.user.isOnline ? 'border-green-500' : 'bg-zinc-400'}`}
                                            >
                                                <AvatarImage src={sender?.user.image || '#'} alt={sender?.user.name} />
                                                <AvatarFallback>DF</AvatarFallback>
                                            </Avatar>
                                        </LandingListBodyItem>
                                        <LandingListBodyItem className='w-2/6 lg:w-3/12'>{sender?.user.name}</LandingListBodyItem>
                                        <LandingListBodyItem className='w-2/6 lg:w-5/12 truncate'>
                                            {convers.messages[0] ? convers.messages[0].content : 'no content'}
                                        </LandingListBodyItem>
                                        <LandingListBodyItem className='w-1/6 lg:w-2/12 truncate'>
                                            {convers.messages[0] ? fromNow : 'no content'}
                                        </LandingListBodyItem>
                                    </Link>
                                </LandingListBodyRow>
                            )
                        })
                    ) : (
                        <p className='p-2.5 text-center'>{dictionary.dashboard.conversation.noEntry}</p>
                    )}
                </LandingListBody>
            </LandingList>
        </LandingListContainer>
    )
}

export { LandingConversationList }
