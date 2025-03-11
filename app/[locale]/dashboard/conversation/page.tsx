import { TParamsLocale } from '@/app/[locale]/_contants'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getDictionary } from '@/i18n/dictionaries'

import Link from 'next/link'
import WithUser, { TWithUserProp } from '../with-user'
import ConversationSidebar from './_components/conversation-sidebar'
import ConversationContactForm from './_components/create-contact'
import { TParticipants } from '@/lib/types'
import { fetchAllConversations } from '@/lib/conversation-helpers'

type TProps = TParamsLocale & TWithUserProp

async function Conversation({ params, user }: TProps) {
    const locale = (await params).locale
    const dictionary = await getDictionary(locale)
    const conversations = await fetchAllConversations(user.email)

    return (
        <div className='size-full max-h-[calc(100%-7rem)] max-w-full'>
            <h2 className='text-center text-2xl font-bold mb-10'>{dictionary.conversation.title}</h2>
            <div className='flex flex-col lg:flex-row gap-5 size-full'>
                <div className='h-[calc(100%-10rem)] lg:h-full lg:flex-1 border border-accent rounded-lg p-5'>
                    <div className='flex flex-col gap-2 h-full'>
                        <h2 className='text-base lg:text-xl my-3'> {locale === 'fa' ? 'آخرین گفتگو ها :' : 'Latest Conversations :'}</h2>
                        {conversations.length ? (
                            conversations.map(convers => {
                                const sender = convers.participants.find((pt: TParticipants) => pt.user.email !== user.email)
                                return (
                                    <Link
                                        key={convers.id}
                                        href={`/${locale}/dashboard/conversation/${convers.id}`}
                                        className='flex items-center gap-2 border p-3 hover:bg-accent rounded-lg '
                                    >
                                        <Avatar className='size-12'>
                                            <AvatarImage src={sender?.user.image || '#'} alt={sender?.user.name} />
                                            <AvatarFallback>DF</AvatarFallback>
                                        </Avatar>
                                        <div className=''>
                                            <div className='text-sm lg:text-base'>{sender?.user.name}</div>
                                            <div className='text-sm lg:text-base w-3xs truncate'>
                                                {convers.messages[0] ? convers.messages[0].content : 'no content'}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        ) : (
                            <p>no conversation</p>
                        )}
                    </div>
                </div>
                <div className='flex flex-col p-3 size-full lg:w-xs border border-accent rounded-lg'>
                    <h2 className='my-3 text-base lg:text-xl'>{locale === 'fa' ? 'مخاطبین :' : 'Contacts :'}</h2>
                    <ConversationSidebar user={user} />
                    <ConversationContactForm user={user} />
                </div>
            </div>
        </div>
    )
}

export default WithUser(Conversation)
