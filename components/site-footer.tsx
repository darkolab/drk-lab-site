import Link from "next/link";
import Image from "next/image";

const socials = [
  { name: "Instagram", href: "https://instagram.com/drk-lab" },
  { name: "TikTok", href: "https://tiktok.com/@drk-lab" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/drk-lab" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-black/40">
      <div className="mx-auto max-w-7xl px-6 py-12 text-slate-300">
        <div className="grid gap-8 md:grid-cols-[2fr,1.2fr,1fr]">
          <div className="space-y-4">
            <div className="relative h-10 w-40 md:h-12 md:w-48">
              <Image src="/drklab_logo.png" alt="DRK LAB" fill className="object-contain" />
            </div>
            <p className="max-w-md text-sm text-slate-400">
              Enginyeria per a rodatges, accessoris a mida i peces pensades per aguantar ritmes de rental i set.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Seccions</h2>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/" className="hover:text-white">
                  Inici
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white">
                  Productes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contacte
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 text-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Social</h2>
            <ul className="space-y-2 text-slate-300">
              {socials.map((social) => (
                <li key={social.name}>
                  <a href={social.href} className="inline-flex items-center gap-2 hover:text-white" target="_blank" rel="noreferrer">
                    <span className="h-2 w-2 rounded-full bg-red-500" aria-hidden />
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} DRK LAB · Disseny i fabricació d'accessoris tècnics.</p>
          <p className="text-slate-500">Construït a mà en mode dark.</p>
        </div>
      </div>
    </footer>
  );
}
