import WithUser, { TWithUserProp } from '@/app/[locale]/dashboard/with-user'
import { getDictionary } from '@/i18n/dictionaries'
import ClipboardsTable from './_components/clipboards-table'
import CreateClipboard from './_components/create-clipboard'
import { TParamsLocale } from '../../_contants'

type TProp = TParamsLocale & TWithUserProp

async function Clipboard({ params, user }: TProp) {
    const locale = (await params).locale
    const dictionary = await getDictionary(locale)

    return (
        <>
            <h2 className='text-center text-3xl font-bold'>{dictionary.clipboard.title}</h2>
            <CreateClipboard email={user.email} />
            <ClipboardsTable user={user} />
        </>
    )
}

export default WithUser(Clipboard)
