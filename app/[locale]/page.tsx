// app/[locale]/page.tsx
import Link from "next/link";

import { Hero } from "@/components/hero";
import { products } from "@/lib/products";
import { getDictionary, locales, resolveLocale } from "@/lib/i18n";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: HomePageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  const dictionary = await getDictionary(locale);

  const featuredSlugs = ["drk-cap-led", "drk-case-media", "drk-merch-pro"];
  let featuredProducts = products.filter((p) => featuredSlugs.includes(p.slug));
  if (featuredProducts.length === 0) featuredProducts = products.slice(0, 3);

  const withLocale = (href: string) => {
    if (href.startsWith("http")) return href;
    if (href.startsWith(`/${locale}`)) return href;
    if (href.startsWith("/")) return `/${locale}${href}`;
    if (href.startsWith("#")) return `/${locale}${href}`;
    return `/${locale}/${href}`;
  };

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <Hero slides={dictionary.hero.slides} locale={locale} />

      {/* WHY DRK LAB */}
      <section className="border-b border-slate-900 bg-[#050509] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <h2 className="text-2xl font-semibold text-white">
            {dictionary.home.why.title}
          </h2>

          <p className="mt-5 mx-auto max-w-3xl text-[0.95rem] text-slate-300 md:text-base">
            {dictionary.home.why.description}
          </p>

          <ul className="mt-10 mx-auto max-w-3xl space-y-3 text-left text-[0.95rem] text-slate-200 md:text-base">
            {dictionary.home.why.bullets.map((item: string) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* PROCESO */}
          <div className="mt-20">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              {dictionary.home.process.kicker}
            </p>

            <h3 className="mt-4 text-xl font-semibold text-white">
              {dictionary.home.process.title}
            </h3>

            <p className="mt-4 mx-auto max-w-3xl text-[0.95rem] text-slate-300 md:text-base">
              {dictionary.home.process.description}
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-3 text-left">
              {dictionary.home.process.steps.map(
                (step: { number: string; title: string; text: string }) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-slate-800 bg-black/40 p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 text-sm font-semibold text-red-200">
                        {step.number}
                      </span>
                      <p className="text-[0.95rem] font-semibold text-slate-100 md:text-base">
                        {step.title}
                      </p>
                    </div>
                    <p className="mt-4 text-[0.95rem] text-slate-300 md:text-base">
                      {step.text}
                    </p>
                  </div>
                ),
              )}
            </div>

            <div className="mt-12 flex justify-center gap-4">
              <Link
                href={withLocale("/contact")}
                className="rounded-full bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600"
              >
                {dictionary.home.why.ctaPrimary}
              </Link>

              <Link
                href={withLocale("/services")}
                className="rounded-full border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-300"
              >
                {dictionary.home.why.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="border-b border-slate-900 bg-[#050509] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-2xl font-semibold text-white">
            {dictionary.home.featured.title}
          </h2>

          <p className="mt-4 max-w-2xl text-[0.95rem] text-slate-300 md:text-base">
            {dictionary.home.featured.description}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.slug}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-black/40 p-6"
              >
                <div>
                  <h3 className="text-[0.95rem] font-semibold text-slate-100 md:text-base">
                    <Link
                      href={withLocale(`/products/${product.slug}`)}
                      className="hover:text-red-400"
                    >
                      {product.code} · {product.shortName ?? product.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[0.95rem] text-slate-300 md:text-base">
                    {product.shortDescription}
                  </p>
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  {product.status}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 text-sm">
            <Link
              href={withLocale("/products")}
              className="text-red-400 hover:text-red-300"
            >
              {dictionary.home.featured.viewAll}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
