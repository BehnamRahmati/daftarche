import { TParamsLocale } from '@/app/[locale]/_contants'
import DashboardClipboardList from '@/app/[locale]/dashboard/_components/dashboard-clipboard-list'
import DashboardConversationList from '@/app/[locale]/dashboard/_components/dashboard-conversation-list'
import { getDictionary } from '@/i18n/dictionaries'
import WithUser, { TWithUserProp } from './with-user'
import ConversationSidebar from './conversation/_components/conversation-sidebar'
import { DashboardUser } from './_components'

type TProps = TParamsLocale & TWithUserProp

async function Dashboard({ params, user }: TProps) {
    const locale = (await params).locale
    const dictionary = await getDictionary(locale)

    return (
        <div className='dashboard'>
            <div className='dashboard_main'>
                {/* user and files info */}
                <div className='dashboard-fileUser_container'>
                    {/* user info */}
                    <div className='flex flex-col lg:flex-row gap-5 lg:col-span-3'>
                        <DashboardUser user={user} />
                        <div className='w-full lg:w-3/5 rounded-3xl lg:shadow-md border border-accent bg-background p-5 '>
                            <div className='dashboard-title'>{locale === "en" ? "Contacts" : "مخاطبین"}</div>
                           <ConversationSidebar user={user} />
                        </div>
                    </div>
                    {/* files info */}
                    <div className=''>
                        <div className='dashboard-title'>{locale === "en" ? "Recent Files" : "آخرین فایل ها"}</div>
                        <div className='lg:h-[calc(100%-3rem)] lg:shadow-md bg-background border border-accent p-5 rounded-3xl'>{locale === "en" ? "no file found !" : "هیچ فایلی پیدا نشد!"} </div>
                    </div>
                </div>
                <div className='dashboard-conversation lg:shadow-md'>
                    <div className='dashboard-title'>{dictionary.dashboard.conversation.title}</div>
                    <DashboardConversationList locale={locale} user={user} />
                </div>
            </div>
            <div className='dashboard-sidebar lg:shadow-md'>
                <div className='dashboard-title p-5 pb-0'>{dictionary.dashboard.clipboard.title}</div>
                <DashboardClipboardList user={user} />
            </div>
        </div>
    )
}

export default WithUser(Dashboard)
