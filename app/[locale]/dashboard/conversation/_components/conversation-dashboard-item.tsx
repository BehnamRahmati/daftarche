import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

import moment from 'moment'

import { TUser } from '@/lib/types'
import ContactDropdown from './contact-dropdown'
import { useParams } from 'next/navigation'

function ConversationDashboardItem({ contact , contactId  }: { contact: TUser;  contactId: string }) {
    const locale = useParams().locale as 'fa' | 'en'
    return (
        <div key={contact.id} className='flex items-center gap-2.5 w-full'>
            <div className='flex w-5/6 items-center gap-2 overflow-hidden'>
                <Avatar
                    className={`size-10 rounded-lg bg-zinc-300 lg:size-12 border-2 ${contact.isOnline ? 'border-green-500' : 'border-zinc-300'}`}
                >
                    <AvatarImage src={contact.image} alt={`${contact.name}`} />
                    <AvatarFallback>DF</AvatarFallback>
                </Avatar>
                <div className='w-5/6'>
                    <div className='flex justify-between items-center'>
                        <p className='font-light'>{contact.name}</p>
                        <p className='text-xs text-zinc-500 font-light'>{moment(contact.lastActive).locale(locale).fromNow()}</p>
                    </div>
                    <p className='truncate text-sm hidden lg:block'>{contact.email}</p>
                </div>
            </div>
            <div className='w-1/6 flex justify-center'>
                <ContactDropdown contactId={contactId} recipientId={contact.id!} />
            </div>
        </div>
    )
}

export default React.memo(ConversationDashboardItem)
