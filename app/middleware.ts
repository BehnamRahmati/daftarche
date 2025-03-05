import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip paths like API routes or static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  // Check if locale is already in the path
  const locale = i18n.locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  if (!locale) {
    // Redirect to default locale if no locale is in the path
    const url = new URL(`/${i18n.defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Match all paths excluding the ones that should not 
      be processed by the middleware.
    */
    "/((?!_next|api|static|favicon.ico).*)",
  ],
};