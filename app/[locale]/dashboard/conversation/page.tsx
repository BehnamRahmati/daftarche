import { TParamsLocale } from '@/app/[locale]/_contants'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { fetchAllConversations } from '@/lib/conversation-helpers'
import { TParticipants } from '@/lib/types'
import moment from 'moment'
import Link from 'next/link'
import WithUser, { TWithUserProp } from '../with-user'
import ConversationSidebar from './_components/conversation-sidebar'
import ConversationContactForm from './_components/create-contact'

type TProps = TParamsLocale & TWithUserProp

async function Conversation({ params, user }: TProps) {
    const locale = (await params).locale
    const conversations = await fetchAllConversations(user.email)

    return (
        <div className='size-full flex flex-col '>
            <div className='flex flex-col lg:flex-row gap-2.5 flex-1'>
                <div className='h-full w-full lg:w-2/3 bg-sidebar lg:border border-sidebar-border rounded-lg lg:p-2.5'>
                    <div className='flex flex-col h-full'>
                        <h2 className='text-base lg:text-xl my-2.5'>
                            {locale === 'fa' ? 'آخرین گفتگو ها :' : 'Latest Conversations :'}
                        </h2>
                        {conversations.length ? (
                            conversations.map(convers => {
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
                                                    {convers.messages.length !== 0
                                                        ? convers.messages.map(msg => msg.content)
                                                        : 'no content'}
                                                </div>
                                            </div>
                                            <div className='shrink-0'></div>
                                        </div>
                                    </Link>
                                )
                            })
                        ) : (
                            <p>no conversation</p>
                        )}
                    </div>
                </div>
                <div className='flex flex-col w-full lg:w-1/3 gap-2.5 lg:p-2.5 bg-sidebar size-full lg:border border-sidebar-border rounded-lg'>
                    <h2 className='my-3 text-base lg:text-xl'>{locale === 'fa' ? 'مخاطبین :' : 'Contacts :'}</h2>
                    <ConversationSidebar user={user} />
                    <ConversationContactForm user={user} />
                </div>
            </div>
        </div>
    )
}

export default WithUser(Conversation)
