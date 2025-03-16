'use client'

import useSWR from 'swr'
import moment from 'moment'
import { TUser } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { fetchUserContacts } from '@/lib/user-helpers'
import { useParams, usePathname } from 'next/navigation'
import ContactDropdown from './contact-dropdown'
import ConversationSidebarSkeleton from './conversation-sidebar-skeleton'

export default function ConversationSidebar({ user }: { user: TUser }) {
    const locale = useParams().locale as 'en' | 'fa'
    const pathname = usePathname()
    const { data, isLoading, error } = useSWR(`/api/user/${encodeURIComponent(user.email)}/contact`, fetchUserContacts, {
        refreshInterval: 5000,
    })

    if (isLoading || !data || !data.contacts) return <ConversationSidebarSkeleton />

    if (error) return <p className='p-5 text-center'>{locale === 'en' ? 'Error' : 'اررور'}</p>

    return (
        <div className='flex flex-1 flex-col gap-2'>
            {data.contacts.length !== 0 ? (
                pathname === `/${locale}/dashboard` ? (
                    data.contacts.slice(-4, -1).map(contactItem => (
                        <div key={contactItem.id} className='flex items-center gap-2 w-full'>
                            <div className='flex w-5/6 items-center gap-2 overflow-hidden'>
                                <Avatar
                                    className={`size-7 lg:size-12 border-4 ${contactItem.isOnline ? 'border-green-500' : 'border-zinc-300'}`}
                                >
                                    <AvatarImage src={contactItem.image} alt={`${contactItem.name}`} />
                                    <AvatarFallback>DF</AvatarFallback>
                                </Avatar>
                                <div className='w-5/6'>
                                    <div className='flex gap-2'>
                                        <p className='text-sm font-bold'>{contactItem.name}</p>
                                        <p className='text-xs'>{moment(contactItem.lastActive).locale(locale).fromNow()}</p>
                                    </div>
                                    <p className='truncate text-sm hidden lg:block'>{contactItem.email}</p>
                                </div>
                            </div>
                            <div className='w-1/6 flex justify-center'>
                                <ContactDropdown contactId={data.contact.id} user={user} recipientId={contactItem.id!} />
                            </div>
                        </div>
                    ))
                ) : (
                    data.contacts.map(contactItem => (
                        <div key={contactItem.id} className='flex w-full items-center gap-2 overflow-hidden'>
                            <div className='flex w-5/6 items-center gap-2'>
                                <Avatar
                                    className={`size-7 lg:size-12 border-4 ${contactItem.isOnline ? 'border-green-500' : 'border-zinc-300'}`}
                                >
                                    <AvatarImage src={contactItem.image} alt={`${contactItem.name}`} />
                                    <AvatarFallback>DF</AvatarFallback>
                                </Avatar>
                                <div className='w-5/6'>
                                    <div className='flex gap-2'>
                                        <p className='text-sm font-bold'>{contactItem.name}</p>
                                        <p className='text-xs'>{moment(contactItem.lastActive).locale(locale).fromNow()}</p>
                                    </div>
                                    <p className='truncate text-sm hidden lg:block'>{contactItem.email}</p>
                                </div>
                            </div>
                            <div className='w-1/6'>
                                <ContactDropdown contactId={data.contact.id} user={user} recipientId={contactItem.id!} />
                            </div>
                        </div>
                    ))
                )
            ) : (
                <p>{locale === 'en' ? 'You have no contact!' : 'هیچ مخاطبی ندارید 😂'}</p>
            )}
        </div>
    )
}
