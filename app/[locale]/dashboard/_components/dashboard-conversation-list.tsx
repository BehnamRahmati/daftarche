import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { fetchAllConversations } from '@/lib/conversation-helpers'
import { TParticipants, TUser } from '@/lib/types'
import moment from 'moment'
import Link from 'next/link'

type TProps = {
    user: TUser
    locale: 'fa' | 'en'
}

export default async function DashboardConversationList({ locale, user }: TProps) {
    const conversations = await fetchAllConversations(user.email)

    return (
        <div className='rounded-xl border border-accent overflow-hidden'>
            <Table>
                <TableBody>
                    {conversations.length ? (
                        conversations.map(convers => {
                            const sender = convers.participants.find((pt: TParticipants) => pt.user.email !== user.email)
                            const fromNow = moment(convers.messages[0].createdAt).locale(locale).fromNow()
                            return (
                                <TableRow key={convers.id}>
                                    <TableCell className='w-1/6 lg:w-2/12'>
                                        <Avatar
                                            className={`size-8 lg:size-12 border-4 ${sender?.user.isOnline ? 'border-green-500' : 'bg-zinc-400'}`}
                                        >
                                            <AvatarImage src={sender?.user.image || '#'} alt={sender?.user.name} />
                                            <AvatarFallback>DF</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className='w-1/6 lg:w-3/12'>
                                        <Link href={`/${locale}/dashboard/conversation/${convers.id}`} className='block py-2'>
                                            {sender?.user.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className='w-32 lg:w-5/12 truncate'>
                                        <Link href={`/${locale}/dashboard/conversation/${convers.id}`} className='block py-2'>
                                            {convers.messages[0] ? convers.messages[0].content : 'no content'}
                                        </Link>
                                    </TableCell>
                                    <TableCell className='w-1/6 lg:w-2/12'>
                                        {convers.messages[0] ? fromNow : 'no content'}
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    ) : (
                        <p>no conversation</p>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
