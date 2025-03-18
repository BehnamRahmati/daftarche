import { TParamsLocale } from '@/app/[locale]/_contants'
import { getDictionary } from '@/i18n/dictionaries'
import WithUser, { TWithUserProp } from '../with-user'
import DownloadForm from './_components/download-form'
import DownloadList from './_components/download-list'
import UploadForm from './_components/upload-form'

type TProps = TParamsLocale & TWithUserProp

async function File({ params, user }: TProps) {
    const locale = (await params).locale
    const dictionary = await getDictionary(locale)
    return (
        <div>
            <div className='flex items-center flex-col lg:flex-row gap-5'>
                <DownloadForm email={user.email} dictionary={dictionary} />
                <UploadForm email={user.email} dictionary={dictionary} />
            </div>

            <DownloadList email={user.email} />
        </div>
    )
}

export default WithUser(File)
