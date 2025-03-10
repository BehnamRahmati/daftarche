import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { getDictionary } from '@/i18n/dictionaries'
import React from 'react'
import { TParamsLocale } from '../../_contants'
import WithUser, { TWithUserProp } from '../with-user'
import ConversationSidebar from './conversation-sidebar'
type TProps = TParamsLocale &
    TWithUserProp & {
        children: React.ReactNode
    }

async function ConversationLayout({ children, params, user }: TProps) {
    const locale = (await params).locale
    const dictionary = await getDictionary(locale)

    return (
        <div className='size-full max-h-[calc(100%-5rem)] max-w-full'>
            <h2 className='text-center text-2xl font-bold'>{dictionary.conversation.title}</h2>
            <ResizablePanelGroup direction='horizontal' className='mt-10 size-full rounded-lg border'>
                <ResizablePanel defaultSize={65} className='p-3'>
                    {children}
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={35}>
                    <ConversationSidebar user={user} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default WithUser(ConversationLayout)
