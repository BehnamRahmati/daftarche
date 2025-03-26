'use client'

import useContacts from '@/hooks/use-contacts'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'
import { LandingNoEntry } from '../../_components/landing'
import { TWithUserProp } from '../../with-user'
import ConversationDashboardItem from './conversation-dashboard-item'
import ConversationSidebarItem from './conversation-sidebar-item'
import ConversationSidebarSkeleton from './conversation-sidebar-skeleton'

function ConversationSidebar({ user }: TWithUserProp) {
    const locale = useParams().locale as 'en' | 'fa'
    const pathname = usePathname()
    const { contacts, contact, isLoading, error } = useContacts(user.id)

    if (isLoading) return <ConversationSidebarSkeleton />

    if (!contact || !contacts || contacts.length === 0)
        return <LandingNoEntry>{locale === 'en' ? 'You have no contact!' : 'هیچ مخاطبی ندارید'}</LandingNoEntry>

    if (error) return <p className='p-5 text-center'>{locale === 'en' ? 'Error' : 'اررور'}</p>

    return (
        <div className={`flex flex-1 flex-col gap-2.5 ${pathname === `/${locale}/dashboard` && 'lg:justify-between'}`}>
            {pathname === `/${locale}/dashboard`
                ? contacts.map(contactItem => (
                      <ConversationDashboardItem key={contactItem.id} contact={contactItem} contactId={contact.id} />
                  ))
                : contacts.map(contactItem => (
                      <ConversationSidebarItem key={contactItem.id} contact={contactItem} contactId={contact.id} />
                  ))}
        </div>
    )
}

export default React.memo(ConversationSidebar)
