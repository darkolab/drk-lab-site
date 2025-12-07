// app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";

import "./globals.css";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "DRK LAB · Enginyeria per a rodatges",
  description: "DRK LAB dissenya i fabrica accessoris tècnics…",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32" },
      { url: "/favicon-48.png", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

async function getLocaleFromCookies(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value?.trim();

  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale as Locale;
  }

  return defaultLocale;
}

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocaleFromCookies();

  return (
    <html lang={locale}>
      <body className="bg-[#050509] text-slate-100">{children}</body>
    </html>
  );
}
