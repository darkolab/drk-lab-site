// components/site-footer.tsx
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

const socials = [
  {
    name: "Instagram",
    label: "IG",
    href: "https://instagram.com/drk-lab",
  },
  {
    name: "TikTok",
    label: "TT",
    href: "https://tiktok.com/@drk-lab",
  },
  {
    name: "LinkedIn",
    label: "IN",
    href: "https://www.linkedin.com/company/drk-lab",
  },
];

export type FooterDictionary = {
  tagline: string;
  navigation: {
    home: string;
    products: string;
    about: string;
    contact: string;
  };
  copyright: string;
  crafted: string;
};

export function SiteFooter({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: FooterDictionary;
}) {
  const withLocale = (href: string) => `/${locale}${href}`;

  return (
    <footer className="border-t border-slate-800 bg-black/40">
      <div className="mx-auto max-w-8xl px-6 py-10 text-slate-300">
        {/* Top: logo + copy + redes a la derecha */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="space-y-3">
            <div className="relative h-8 w-36 md:h-10 md:w-40">
              <Image
                src="/drklab_logo.png"
                alt="DRK LAB"
                fill
                className="object-contain"
              />
            </div>
            <p className="max-w-md text-xs text-slate-400 md:text-sm">{dictionary.tagline}</p>
          </div>

          <div className="flex w-full items-center justify-start gap-3 md:w-auto md:justify-end">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/70 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-slate-200 transition hover:border-red-500 hover:bg-slate-900 hover:text-white"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[10px] font-semibold text-slate-100">
                  {social.label}
                </span>
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom: nav centrado + copyright / tagline */}
        <div className="mt-8 border-t border-slate-800 pt-4">
          <nav className="flex flex-wrap justify-center gap-6 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
            <Link href={`/${locale}`} className="hover:text-white">
              {dictionary.navigation.home}
            </Link>
            <Link href={withLocale("/products")} className="hover:text-white">
              {dictionary.navigation.products}
            </Link>
            <Link href={withLocale("/about")} className="hover:text-white">
              {dictionary.navigation.about}
            </Link>
            <Link href={withLocale("/contact")} className="hover:text-white">
              {dictionary.navigation.contact}
            </Link>
          </nav>

          <div className="mt-4 flex flex-col items-center justify-between gap-2 text-[11px] text-slate-500 md:flex-row">
            <p>
              © {new Date().getFullYear()} {dictionary.copyright}
            </p>
            <p className="md:text-right">{dictionary.crafted}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
