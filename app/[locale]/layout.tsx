// app/[locale]/layout.tsx
import type { Metadata } from "next";
import type React from "react";
import Script from "next/script";

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

// ✅ Cambia esto si un día mueves dominio.
// Si tienes env, mejor: NEXT_PUBLIC_SITE_URL="https://drklab.studio"
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://drklab.studio";

const LOCALE_TO_OG: Record<Locale, string> = {
  es: "es_ES",
  ca: "ca_ES",
  en: "en_US",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const dictionary = await getDictionary(locale);

  const base = new URL(SITE_URL);

  // Canonical / alternates
  const canonicalPath = `/${locale}`;
  const canonicalUrl = new URL(canonicalPath, base);

  const languageAlternates: Record<string, string> = {};
  for (const loc of locales) {
    languageAlternates[loc] = new URL(`/${loc}`, base).toString();
  }

  // OG image (pon una imagen real en /public/og.jpg)
  // Recomendado 1200x630, ligera y con look DRK LAB.
  const ogImage = new URL("/og.jpg", base).toString();

  return {
    metadataBase: base,

    // Title/Description
    title: {
      default: dictionary.meta.title,
      template: `%s · DRK LAB`,
    },
    description: dictionary.meta.description,

    alternates: {
      canonical: canonicalUrl.toString(),
      languages: languageAlternates,
    },

    // Idioma principal por página
    // (Google no siempre lo usa, pero ayuda)
    other: {
      "content-language": locale,
    },

    // OpenGraph (para snippet bonito al compartir)
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      url: canonicalUrl.toString(),
      siteName: "DRK LAB",
      locale: LOCALE_TO_OG[locale],
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "DRK LAB",
        },
      ],
    },

    // Twitter/X (también se usa mucho en previews)
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: [ogImage],
    },

    // Robots: durante beta puedes dejar index=true si ya quieres aparecer.
    // Si prefieres que NO indexe aún, dime y lo pongo a false.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32" },
        { url: "/favicon-48.png", sizes: "48x48" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const dictionary = await getDictionary(locale);

  // ✅ JSON-LD básico (marca). Esto ayuda a que Google “entienda” DRK LAB.
  // Si algún día añades dirección/teléfono, lo ampliamos.
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DRK LAB",
    url: SITE_URL,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    sameAs: [
      // Pon aquí las redes oficiales si quieres (cuando estén finas)
      // "https://www.instagram.com/drklab3d/",
    ],
  };

  return (
    <>
      <Script
        id="org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

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

      <SiteHeader locale={locale} dictionary={dictionary.common.navigation} />

      {children}

      <SiteFooter locale={locale} dictionary={dictionary.common.footer} />
    </>
  );
}
