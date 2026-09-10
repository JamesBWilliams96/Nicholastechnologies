import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, isLocale, negotiateLocale } from "@/lib/i18n/config";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Every page lives under a locale prefix (/en, /sk, /cs, /de, /pl, /hu).
 * Requests without one are sent to the visitor's language: an explicit
 * choice remembered in a cookie first, then the browser's Accept-Language,
 * then English. Visiting a prefixed URL records that language.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (isLocale(first)) {
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== first) {
      response.cookies.set(LOCALE_COOKIE, first, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
    }
    return response;
  }

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved) ? saved : negotiateLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  /* Skip Next internals, the API, metadata routes and any file with an extension. */
  matcher: ["/((?!_next|api|apple-icon|.*\\..*).*)"],
};
