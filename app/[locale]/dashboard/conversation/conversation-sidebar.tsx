'use client'
import { fetchUserContacts, TUser } from '@/libs/clipboard.helpers'
import useSWR from 'swr'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ContactDropdown from './contact-dropdown'
import ConversationContactForm from './create-contact'

export default function ConversationSidebar({ user }: { user: TUser }) {
    const { data: contacts, isLoading, error } = useSWR(user.email, fetchUserContacts)

    if (isLoading || !contacts || !contacts[0].contact) return <p>loading</p>

    if (error || !contacts.length) return <p>no data</p>

    return (
        <div className='flex h-full flex-col p-3'>
            <h2 className='mb-3 text-xl'>contacts</h2>
            <div className='flex flex-1 flex-col'>
                {contacts.length ? (
                    contacts.map(contactItem => (
                        <div key={contactItem.id} className='flex w-full items-center gap-2 overflow-hidden p-2'>
                            <div className='flex w-5/6 items-center gap-2'>
                                <Avatar className='size-12'>
                                    <AvatarImage src={contactItem.contact.image} alt={`${contactItem.contact.name}`} />
                                    <AvatarFallback>DF</AvatarFallback>
                                </Avatar>
                                <div className='w-5/6'>
                                    <p className='text-sm font-bold'>{contactItem.contact.name}</p>
                                    <p className='truncate text-sm'>{contactItem.contact.email}</p>
                                </div>
                            </div>
                            <div className='w-1/6'>
                                <ContactDropdown contactId={contactItem.id} user={user} recipientId={contactItem.contact.id} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>no contacts found</p>
                )}
            </div>
            <ConversationContactForm user={user} />
        </div>
    )
}
