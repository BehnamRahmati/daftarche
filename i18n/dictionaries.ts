import 'server-only'

const dictionaries = {
    en: () => import('./en.json').then(module => module.default),
    fa: () => import('./fa.json').then(module => module.default),
}

export const getDictionary = async (locale: 'en' | 'fa') => dictionaries[locale]()
