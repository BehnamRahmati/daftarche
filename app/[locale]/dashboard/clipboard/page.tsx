import WithUser, { TWithUserProp } from '@/app/[locale]/dashboard/with-user'
import { getDictionary } from '@/i18n/dictionaries'
import ClipboardsTable from './_components/clipboards-table'
import CreateClipboard from './_components/create-clipboard'

type TProp = TWithUserProp & {
    params: Promise<{ locale: 'fa' | 'en' }>
}

async function Clipboard({ user, params }: TProp) {
    const locale = (await params).locale
    const dictionary = await getDictionary(locale)

    return (
        <>
            <div>
                <h2 className='text-center text-3xl font-bold my-5'>{dictionary.clipboard.title}</h2>
                <p className='text-center max-w-md mx-auto'>{dictionary.clipboard.subtitle}</p>
            </div>
            <CreateClipboard email={user.email} />
            <ClipboardsTable user={user} />
        </>
    )
}

export default WithUser(Clipboard)
