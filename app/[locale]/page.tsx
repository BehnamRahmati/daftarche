import { getDictionary } from '@/i18n/dictionaries'
import React from 'react'
import { TParamsLocale } from '@/app/[locale]/_contants'

type TProps = TParamsLocale

export default async function Home({params} : TProps) {
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
