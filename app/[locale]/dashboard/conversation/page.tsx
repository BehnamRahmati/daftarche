import { TParamsLocale } from '@/app/[locale]/_contants'

import WithUser, { TWithUserProp } from '../with-user'
import ConversationSidebar from './_components/conversation-sidebar'
import ConversationContactForm from './_components/create-contact'
import ConversationList from './conversations-list'

type TProps = TParamsLocale & TWithUserProp

async function Conversation({ params, user }: TProps) {
    const locale = (await params).locale

    return (
        <div className='size-full flex flex-col '>
            <div className='flex flex-col lg:flex-row gap-2.5 flex-1'>
                <div className='h-full w-full lg:w-2/3 lg:bg-sidebar lg:border border-sidebar-border rounded-lg lg:p-2.5'>
                    <div className='flex flex-col h-full'>
                        <h2 className='text-base lg:text-xl my-2.5'>
                            {locale === 'fa' ? 'آخرین گفتگو ها :' : 'Latest Conversations :'}
                        </h2>
                        <ConversationList user={user} locale={locale} />
                    </div>
                </div>
                <div className='flex flex-col w-full lg:w-1/3 gap-2.5 lg:p-2.5 lg:bg-sidebar size-full lg:border border-sidebar-border rounded-lg'>
                    <h2 className='mt-2.5 text-base lg:text-xl'>{locale === 'fa' ? 'مخاطبین :' : 'Contacts :'}</h2>
                    <ConversationSidebar user={user} />
                    <ConversationContactForm user={user} />
                </div>
            </div>
        </div>
    )
}

export default WithUser(Conversation)
