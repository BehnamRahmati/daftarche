'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TUser } from '@/lib/types'
import { fetchUserContacts } from '@/lib/user-helpers'
import moment from 'moment'
import { useParams, usePathname } from 'next/navigation'
import useSWR from 'swr'
import { LandingNoEntry } from '../../_components/landing'
import ContactDropdown from './contact-dropdown'
import ConversationSidebarSkeleton from './conversation-sidebar-skeleton'

export default function ConversationSidebar({ user }: { user: TUser }) {
    const locale = useParams().locale as 'en' | 'fa'
    const pathname = usePathname()
    const { data, isLoading, error } = useSWR(`/api/user/${encodeURIComponent(user.email)}/contact`, fetchUserContacts, {
        refreshInterval: 5000,
    })

    if (isLoading) return <ConversationSidebarSkeleton />

    if (!data || !data.contacts || data.contacts.length === 0)
        return <LandingNoEntry>{locale === 'en' ? 'You have no contact!' : 'هیچ مخاطبی ندارید'}</LandingNoEntry>

    if (error) return <p className='p-5 text-center'>{locale === 'en' ? 'Error' : 'اررور'}</p>

    return (
        <div className={`flex flex-1 flex-col gap-2.5 ${pathname === `/${locale}/dashboard` && 'lg:justify-between'}`}>
            {pathname === `/${locale}/dashboard`
                ? data.contacts.slice(-4, -1).map(contactItem => (
                      <div key={contactItem.id} className='flex items-center gap-2.5 w-full'>
                          <div className='flex w-5/6 items-center gap-2 overflow-hidden'>
                              <Avatar
                                  className={`size-10 rounded-lg bg-zinc-300 lg:size-12 border-2 ${contactItem.isOnline ? 'border-green-500' : 'border-zinc-300'}`}
                              >
                                  <AvatarImage src={contactItem.image} alt={`${contactItem.name}`} />
                                  <AvatarFallback>DF</AvatarFallback>
                              </Avatar>
                              <div className='w-5/6'>
                                  <div className='flex justify-between items-center'>
                                      <p className='font-light'>{contactItem.name}</p>
                                      <p className='text-xs text-zinc-500 font-light'>
                                          {moment(contactItem.lastActive).locale(locale).fromNow()}
                                      </p>
                                  </div>
                                  <p className='truncate text-sm hidden lg:block'>{contactItem.email}</p>
                              </div>
                          </div>
                          <div className='w-1/6 flex justify-center'>
                              <ContactDropdown contactId={data.contact.id} user={user} recipientId={contactItem.id!} />
                          </div>
                      </div>
                  ))
                : data.contacts.map(contactItem => (
                      <div key={contactItem.id} className='flex w-full items-center gap-2.5 py-1 overflow-hidden'>
                          <div className='flex w-5/6 items-center gap-2'>
                              <Avatar
                                  className={`size-10 rounded-lg bg-zinc-300 border-2 ${contactItem.isOnline ? 'border-green-500' : 'border-zinc-300'}`}
                              >
                                  <AvatarImage src={contactItem.image} alt={`${contactItem.name}`} />
                                  <AvatarFallback>DF</AvatarFallback>
                              </Avatar>
                              <div className='w-5/6'>
                                  <div className='flex flex-col lg:flex-row justify-between '>
                                      <p className='font-light'>{contactItem.name}</p>
                                      <p className='text-sm text-zinc-500 font-light'>
                                          {moment(contactItem.lastActive).locale(locale).fromNow()}
                                      </p>
                                  </div>
                                  <p className='truncate text-sm text-zinc-500 hidden lg:block'>{contactItem.email}</p>
                              </div>
                          </div>
                          <div className='w-1/6'>
                              <ContactDropdown contactId={data.contact.id} user={user} recipientId={contactItem.id!} />
                          </div>
                      </div>
                  ))}
        </div>
    )
}
