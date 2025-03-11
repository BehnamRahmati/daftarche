import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'fa']
const defaultLocale = 'en'

export default function middleware(request: NextRequest) {

    //check if there is any suported locale in pathname
    const { pathname } = request.nextUrl

    // Skip if it's a public file (e.g., images, etc.)
    if (pathname.startsWith('/_next')) return NextResponse.next()

    // Example logic: Redirect if no locale in the URL
    if (!pathname.startsWith('/en') && !pathname.startsWith('/fa')) {
        return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
    }

    // Detect locale from pathname or default to 'en'
    const availableLocales = locales
    const locale = availableLocales.find(loc => pathname.startsWith(`/${loc}`)) || defaultLocale

    // Redirect to locale-specific version if needed
    if (!pathname.startsWith(`/${locale}`) && locale !== defaultLocale) {
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
    }

    // Store locale in cookies or headers (optional)
    const response = NextResponse.next()
    response.cookies.set('NEXT_LOCALE', locale)

    return response
}

export const config = {
    matcher: ['/((?!api|static|_next/static|image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
