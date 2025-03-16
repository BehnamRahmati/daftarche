import { TParamsLocale } from '@/app/[locale]/_contants'
import { getDictionary } from '@/i18n/dictionaries'
import WithUser, { TWithUserProp } from '../with-user'
import DownloadForm from './_components/download-form'
import DownloadList from './_components/download-list'

type TProps = TParamsLocale & TWithUserProp

async function File({ params, user }: TProps) {
    const locale = (await params).locale
    const dictionary = await getDictionary(locale)
    return (
        <div>
            <h2>{dictionary.file.title}</h2>
            <DownloadForm email={user.email} />
            <DownloadList  email={user.email} />
        </div>
    )
}

export default WithUser(File)
