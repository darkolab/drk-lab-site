// app/[locale]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { products } from "@/lib/products";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  const featuredSlugs = ["drk-cap-led", "drk-case-media", "drk-merch-pro"];

  let featuredProducts = products.filter((p) => featuredSlugs.includes(p.slug));

  // Fallback por si un día borras alguno de esos slugs
  if (featuredProducts.length === 0) {
    featuredProducts = products.slice(0, 3);
  }

  return (
    <main className="min-h-screen">
      {/* HERO COMPLET – text + slide sincronitzat */}
      <Hero slides={dictionary.hero.slides} locale={locale} />

      {/* SERVEIS */}
      <section id="serveis" className="border-b border-slate-900 bg-[#050509] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-2xl font-semibold text-white">{dictionary.home.services.title}</h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] text-slate-300 md:text-base">
            {dictionary.home.services.description}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {dictionary.home.services.items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-800 bg-black/40 p-5">
                <p className="text-[0.95rem] font-semibold text-slate-100 md:text-base">{item.title}</p>
                <p className="mt-3 text-[0.95rem] text-slate-300 md:text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTES DESTACATS */}
      <section id="productes" className="border-b border-slate-900 bg-[#050509] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-2xl font-semibold text-white">{dictionary.home.featured.title}</h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] text-slate-300 md:text-base">
            {dictionary.home.featured.description}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.slug}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-black/40 p-5"
              >
                <div>
                  <h3 className="text-[0.95rem] font-semibold text-slate-100 md:text-base">
                    <Link href={`/${locale}/products/${product.slug}`} className="hover:text-red-400">
                      {product.code} · {product.shortName ?? product.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[0.95rem] text-slate-300 md:text-base">{product.shortDescription}</p>
                </div>
                <p className="mt-4 text-xs text-slate-400">{product.status}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 text-sm">
            <Link href={`/${locale}/products`} className="text-red-400 hover:text-red-300">
              {dictionary.home.featured.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* A MIDA */}
      <section id="custom" className="border-b border-slate-900 bg-[#050509] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-2xl font-semibold text-white">{dictionary.home.custom.title}</h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] text-slate-300 md:text-base">
            {dictionary.home.custom.description}
          </p>
          <ul className="mt-6 space-y-2 text-[0.95rem] text-slate-300 md:text-base">
            {dictionary.home.custom.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* SOBRE MI */}
      <section id="sobre" className="bg-[#050509] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-2xl font-semibold text-white">{dictionary.home.about.title}</h2>
          <p className="mt-4 max-w-3xl text-[0.95rem] text-slate-300 md:text-base">
            {dictionary.home.about.description}
          </p>
        </div>
      </section>

      {/* CONTACTE */}
      <section id="contacte" className="border-t border-slate-900 bg-black py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-xl font-semibold text-white">{dictionary.home.contact.title}</h2>
          <p className="mt-3 text-[0.95rem] text-slate-300 md:text-base">
            {dictionary.home.contact.description}
          </p>
          <p className="mt-4 text-[0.95rem] text-slate-100 md:text-base">
            {dictionary.home.contact.emailLabel}{" "}
            <a href={`mailto:${dictionary.home.contact.email}`} className="text-red-400 hover:text-red-300">
              {dictionary.home.contact.email}
            </a>
          </p>
          <p className="mt-8 text-xs text-slate-500">{dictionary.home.contact.tagline}</p>
        </div>
      </section>
    </main>
  );
}
