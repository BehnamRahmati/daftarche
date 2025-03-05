export const i18n = {
    defaultLocale: "en",
    locales: ['en', 'fa']
}


export function getLocaleFrompathname(pathname: string) {
    const pathSegments = pathname.split('/').filter(x => x)
    const locale = pathSegments[0]

    if (i18n.locales.includes(locale)) {
        return locale;
      }
    
      return i18n.defaultLocale;
} 

/**
 * Generate a locale-aware URL (with the correct language prefix).
 * For example: `/fa/blog/post` or `/en/blog/post`.
 * @param {string} locale - The desired locale (e.g., "en" or "fa").
 * @param {string} path - The relative path (e.g., "/blog/post").
 * @returns {string} Locale-aware URL (e.g., "/fa/blog/post").
 */
export function generateLocalePath(locale:string, path:string): string {
    return `/${locale}${path}`;
  }