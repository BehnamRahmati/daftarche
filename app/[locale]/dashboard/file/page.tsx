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
        <>
            <div>
                <h2 className='text-center text-3xl font-bold my-5'>{dictionary.file.title}</h2>
                <p className='text-center max-w-md mx-auto'>{dictionary.file.subtitle}</p>
            </div>
            <div className='flex items-center flex-col gap-5 mt-5 max-w-xl mx-auto'>
                <DownloadForm email={user.email} dictionary={dictionary} />
                <UploadForm email={user.email} dictionary={dictionary} />
            </div>

            <DownloadList id={user.id} />
        </>
    )
}

export default WithUser(File)
