import { getDictionary } from '@/i18n/dictionaries'
import React from 'react'
import { TParamsLocale } from '@/app/[locale]/_contants'
import DashboardClipboardList from '@/components/molecules/list/DashboardClipboardList'
import DashboardConversationList from '@/components/molecules/list/DashboardConversationList'
import DashboardUser from '@/components/molecules/DashboardUser'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.services'

type TProps = TParamsLocale

export default async function Dashboard({ params }: TProps) {
    const locale = (await params).locale
    const dictionary = await getDictionary(locale)
    const session = await getServerSession(authOptions)

    return (
        <div className='dashboard'>
            <div className='dashboard_main'>
                {/* user and files info */}
                <div className='dashboard-fileUser_container'>
                    {/* user info */}
                    <div className='flex gap-5'>
                        <DashboardUser session={session} />
                        <div className='w-2/5 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-[var(--secondary-heavy)] dark:bg-[var(--foreground)]'>
                            <div className='dashboard-title'>used space</div>
                            <div className='mt-5 flex justify-center'>
                                <div className='h-36 w-36 rounded-full bg-zinc-200'></div>
                            </div>
                        </div>
                    </div>
                    {/* files info */}
                    <div className=''>
                        <div className='dashboard-title'>Recent files</div>
                    </div>
                </div>
                <div className='dashboard-conversation'>
                    <div className='dashboard-title'>{dictionary.dashboard.conversation.title}</div>
                    <DashboardConversationList locale={locale} />
                </div>
            </div>
            <div className='dashboard-sidebar'>
                <div className='dashboard-title'>{dictionary.dashboard.clipboard.title}</div>
                <DashboardClipboardList session={session} />
            </div>
        </div>
    )
}
