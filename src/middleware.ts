import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, localeCodes } from "@/i18n/config";

const LOCALE_PREFIXES = localeCodes.filter((c) => c !== defaultLocale);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const stripped =
      pathname === `/${defaultLocale}` ? "/" : pathname.slice(`/${defaultLocale}`.length);
    return NextResponse.redirect(new URL(stripped, request.url));
  }

  const pathnameLocale = LOCALE_PREFIXES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameLocale) {
    const headers = new Headers(request.headers);
    headers.set("x-locale", pathnameLocale);
    return NextResponse.next({ request: { headers } });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  const headers = new Headers(request.headers);
  headers.set("x-locale", defaultLocale);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
