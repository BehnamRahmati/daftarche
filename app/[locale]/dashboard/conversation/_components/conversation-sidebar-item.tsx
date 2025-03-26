import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

import moment from 'moment'

import { TUser } from '@/lib/types'
import { useParams } from 'next/navigation'
import ContactDropdown from './contact-dropdown'

function ConversationSidebarItem({ contact, contactId }: { contact: TUser; contactId: string }) {
    const locale = useParams().locale as 'fa' | 'en'

    return (
        <div key={contact.id} className='flex w-full items-center gap-2.5 py-1 overflow-hidden'>
            <div className='flex w-5/6 items-center gap-2'>
                <Avatar
                    className={`size-10 rounded-lg bg-zinc-300 border-2 ${contact.isOnline ? 'border-green-500' : 'border-zinc-300'}`}
                >
                    <AvatarImage src={contact.image} alt={`${contact.name}`} />
                    <AvatarFallback>DF</AvatarFallback>
                </Avatar>
                <div className='w-5/6'>
                    <div className='flex flex-col lg:flex-row justify-between '>
                        <p className='font-light'>{contact.name}</p>
                        <p className='text-sm text-zinc-500 font-light'>{moment(contact.lastActive).locale(locale).fromNow()}</p>
                    </div>
                    <p className='truncate text-sm text-zinc-500 hidden lg:block'>{contact.email}</p>
                </div>
            </div>
            <div className='w-1/6'>
                <ContactDropdown contactId={contactId} recipientId={contact.id!} />
            </div>
        </div>
    )
}

export default React.memo(ConversationSidebarItem)
