import { TParamsLocale } from '@/app/[locale]/_contants'
import DashboardClipboardList from '@/app/[locale]/dashboard/_components/landing-clipboard-list'
import { getDictionary } from '@/i18n/dictionaries'
import { TDictionary } from '@/lib/types'
import DashboardUser from './_components/client-dashboard-user'
import { LandingContent, LandingSection, LandingSidebar, LandingTitle, LandingWrapper } from './_components/landing'
import { LandingConversationList } from './_components/landing-conversation-list'
import ConversationSidebar from './conversation/_components/conversation-sidebar'
import WithUser, { TWithUserProp } from './with-user'
import DashboardFileList from './_components/landing-file-list'

// * props types
type TProps = TParamsLocale & TWithUserProp

/**
 * * dashboard page mapped
 * - wrapper
 * ---- content wrapper
 * --------- user info
 * --------------- user contacts
 * --------- file info
 * --------- conversations lists
 * ---- sidebar
 * --------- clipboards lists
 */

async function Dashboard({ params, user }: TProps) {
    const locale = (await params).locale
    const dictionary: TDictionary = await getDictionary(locale)

    return (
        <LandingWrapper>
            <LandingContent >
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-2.5 lg:h-1/3'>
                    <DashboardUser user={user} />
                    <LandingSection>
                        <LandingTitle>{dictionary.dashboard.contacts.title}</LandingTitle>
                        <ConversationSidebar user={user} />
                    </LandingSection>
                </div>
                <LandingSection className='lg:h-1/3'>
                    <LandingTitle>{dictionary.dashboard.files.title}</LandingTitle>
                    <DashboardFileList user={user} dictionary={dictionary} />
                </LandingSection>
                <LandingSection className='lg:h-1/3'>
                    <LandingTitle>{dictionary.dashboard.conversation.title}</LandingTitle>
                    <LandingConversationList locale={locale} user={user} />
                </LandingSection>
            </LandingContent>
            <LandingSidebar>
                <LandingTitle>{dictionary.dashboard.clipboard.title}</LandingTitle>
                <DashboardClipboardList user={user} dictionary={dictionary} />
            </LandingSidebar>
        </LandingWrapper>
    )
}

// * user hoc
export default WithUser(Dashboard)
