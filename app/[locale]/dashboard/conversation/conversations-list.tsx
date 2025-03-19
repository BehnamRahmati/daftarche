'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { fetchAllConversations } from '@/lib/conversation-helpers'
import { TParticipants, TUser } from '@/lib/types'
import moment from 'moment'
import Link from 'next/link'
import useSWR from 'swr'
import { LandingListSkleton, LandingNoEntry } from '../_components/landing'

export default function ConversationList({ user, locale }: { user: TUser; locale: 'fa' | 'en' }) {
    const {
        data: conversations,
        isLoading,
    } = useSWR(`/api/conversation?email=${encodeURIComponent(user.email)}`, fetchAllConversations)

    if (isLoading) return <LandingListSkleton count={4} section='conversation' />

    if (!conversations || conversations.length === 0)
        return (
            <LandingNoEntry>
                {/* {dictionary.dashboard.conversation.noEntry} */}
                no conversation
            </LandingNoEntry>
        )

    return (
        <div>
            {conversations.map(convers => {
                const sender = convers.participants.find((pt: TParticipants) => pt.user.email !== user.email)
                // const newMessagesCount = convers.messages.filter(msg)
                return (
                    <Link
                        key={convers.id}
                        href={`/${locale}/dashboard/conversation/${convers.id}`}
                        className='flex items-center gap-2.5 py-2.5 border-b border-b-transparent hover:border-b-accent overflow-hidden'
                    >
                        <Avatar className='size-10 rounded-lg bg-zinc-300'>
                            <AvatarImage src={sender?.user.image || '#'} alt={sender?.user.name} />
                            <AvatarFallback>DF</AvatarFallback>
                        </Avatar>
                        <div className='flex-1 flex items-center'>
                            <div className='flex-1'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-base font-light'>{sender?.user.name}</p>
                                    {convers.messages.length !== 0
                                        ? convers.messages.map(msg => (
                                              <p key={msg.id} className='text-xs lg:text-sm text-zinc-500'>
                                                  {moment(msg.createdAt).format('l')}
                                              </p>
                                          ))
                                        : 'no content'}
                                </div>
                                <div className='flex items-center text-zinc-500 font-light text-sm w-5/6 truncate'>
                                    {convers.messages.length !== 0 ? convers.messages.map(msg => msg.content) : 'no content'}
                                </div>
                            </div>
                            <div className='shrink-0'></div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
