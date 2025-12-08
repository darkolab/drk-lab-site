// app/[locale]/layout.tsx
import type { Metadata } from "next";
import type React from "react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  locales,
  resolveLocale,
  getDictionary,
  type Locale,
} from "@/lib/i18n";

type LocaleParams = {
  params: Promise<{ locale?: string }>;
};

type LocaleLayoutProps = LocaleParams & {
  children: React.ReactNode;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: LocaleParams,
): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32" },
        { url: "/favicon-48.png", sizes: "48x48" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const dictionary = await getDictionary(locale);

  return (
    <>
      {/* BANNER FIRST LIGHT */}
      <div className="sticky top-30 z-[60] w-full border-b border-red-500/60 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] md:text-xs">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300" />
            <span>{dictionary.common.banner.title}</span>
          </span>

          <span className="hidden text-black/80 md:inline">
            {dictionary.common.banner.message}
          </span>
        </div>
      </div>

      <SiteHeader
        locale={locale}
        dictionary={dictionary.common.navigation}
      />

      {children}

      <SiteFooter
        locale={locale}
        dictionary={dictionary.common.footer}
      />
    </>
  );
}
