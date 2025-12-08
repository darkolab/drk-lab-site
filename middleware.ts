// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, resolveLocale } from "@/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // No tocar estáticos / API
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const firstSegment = segments[1]; // '', 'ca', 'es', 'en', etc.

  // Si la primera parte NO es un locale, redirigimos añadiendo uno
  if (!locales.includes(firstSegment as any)) {
    const detected = resolveLocale(
      request.cookies.get("NEXT_LOCALE")?.value ??
        request.headers.get("accept-language"),
    );

    const redirectUrl = new URL(
      `/${detected}${pathname === "/" ? "" : pathname}`,
      request.url,
    );

    const res = NextResponse.redirect(redirectUrl);
    res.cookies.set("NEXT_LOCALE", detected, { path: "/" });
    return res;
  }

  // Si ya lleva locale, lo guardamos en cookie y seguimos
  const res = NextResponse.next();
  res.cookies.set("NEXT_LOCALE", firstSegment as any, { path: "/" });
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
