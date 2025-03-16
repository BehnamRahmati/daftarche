import { TParamsLocale } from '@/app/[locale]/_contants'
import { getDictionary } from '@/i18n/dictionaries'

type TProps = TParamsLocale

export default async function Home({ params }: TProps) {
    const locale = (await params).locale
    const dictionary = await getDictionary(locale)
    return (
        <>
            <header>header</header>
            <main>{dictionary.home.title}</main>
            <footer>footer</footer>
        </>
    )
}
