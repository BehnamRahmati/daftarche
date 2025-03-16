import { TParamsLocale } from '@/app/[locale]/_contants'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getDictionary } from '@/i18n/dictionaries'

import { fetchAllConversations } from '@/lib/conversation-helpers'
import { TParticipants } from '@/lib/types'
import Link from 'next/link'
import WithUser, { TWithUserProp } from '../with-user'
import ConversationSidebar from './_components/conversation-sidebar'
import ConversationContactForm from './_components/create-contact'
import moment from 'moment'

type TProps = TParamsLocale & TWithUserProp

async function Conversation({ params, user }: TProps) {
    const locale = (await params).locale
    const dictionary = await getDictionary(locale)
    const conversations = await fetchAllConversations(user.email)

    return (
        <div className='size-full flex flex-col '>
            <h2 className='text-center text-2xl font-bold my-5'>{dictionary.conversation.title}</h2>
            <div className='flex flex-col lg:flex-row gap-2.5 flex-1'>
                <div className='h-full w-full lg:w-2/3 bg-background border border-sidebar-border rounded-lg p-2.5'>
                    <div className='flex flex-col gap-2.5 h-full'>
                        <h2 className='text-base lg:text-xl my-2.5'>
                            {' '}
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
                                        className='flex items-center gap-2.5 border p-2.5 hover:bg-accent rounded-lg overflow-hidden'
                                    >
                                        <Avatar className='size-8 lg:size-10'>
                                            <AvatarImage src={sender?.user.image || '#'} alt={sender?.user.name} />
                                            <AvatarFallback>DF</AvatarFallback>
                                        </Avatar>
                                        <div className='flex-1 flex items-center'>
                                            <div className='flex-1'>
                                                <div className='flex items-center justify-between'>
                                                    <p className='text-sm lg:text-base font-bold'>{sender?.user.name}</p>
                                                    {convers.messages.length !== 0
                                                        ? convers.messages.map(msg => <p key={msg.id} className="text-xs lg:text-sm text-zinc-500">{moment(msg.createdAt).format('l')}</p>)
                                                        : 'no content'}
                                                    
                                                </div>
                                                <div className='text-xs flex items-center text-zinc-500 lg:text-sm w-5/6 truncate'>
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
                <div className='flex flex-col w-full lg:w-1/3 p-2.5 bg-background size-full border border-sidebar-border rounded-lg'>
                    <h2 className='my-3 text-base lg:text-xl'>{locale === 'fa' ? 'مخاطبین :' : 'Contacts :'}</h2>
                    <ConversationSidebar user={user} />
                    <ConversationContactForm user={user} />
                </div>
            </div>
        </div>
    )
}

export default WithUser(Conversation)
