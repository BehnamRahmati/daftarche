import { TParamsLocale } from '@/app/[locale]/_contants'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { fetchConversations } from '@/libs/clipboard.helpers'
import Link from 'next/link'
import WithUser, { TWithUserProp } from '../with-user'

type TProps = TParamsLocale & TWithUserProp

async function Conversation({ params, user }: TProps) {
    const locale = (await params).locale
    const conversations = await fetchConversations(user.email)
    
    return (
        <div className='flex flex-col gap-2'>
            <h2 className='text-xl'>conversations</h2>
            {conversations.length ? (
                conversations.map((convers: any) => {
                    const sender = convers.participants.find((us: any) => us.user.email !== user.email)
                    return (
                        <Link
                            key={convers.id}
                            href={`/${locale}/dashboard/conversation/${convers.id}`}
                            className='flex items-center gap-2 border p-3 hover:bg-accent rounded-lg '
                        >
                            <Avatar className='size-12'>
                                <AvatarImage src={sender.user.image || '#'} alt={sender.user.name} />
                                <AvatarFallback>DF</AvatarFallback>
                            </Avatar>
                            <div className=''>
                                <div className=''>{sender.user.name}</div>
                                <div className='w-3xs truncate'>{convers.messages[0] ? convers.messages[0].content : "no content"}</div>
                            </div>
                        </Link>
                    )
                })
            ) : (
                <p>no conversation</p>
            )}
        </div>
    )
}

export default WithUser(Conversation)
