import Link from "next/link";

import { getDictionary, resolveLocale, type Locale, locales } from "@/lib/i18n";
import { products } from "@/lib/products";

type ProductDetailPageProps = {
  params: { locale: string; slug: string };
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    products.map((product) => ({
      locale,
      slug: product.slug,
    })),
  );
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const locale: Locale = resolveLocale(params.locale);
  const dictionary = await getDictionary(locale);

  const product = products.find((p) => p.slug === params.slug);
  const categoryLabel = product?.category ? product.category.toUpperCase() : "";

  if (!product) {
    return (
      <main className="min-h-screen bg-[#050509] text-slate-100">
        <div className="mx-auto max-w-4xl space-y-6 px-6 py-16">
          <h1 className="text-2xl font-semibold text-red-400">{dictionary.productDetail.notFoundTitle}</h1>

          <p className="text-sm text-slate-300">
            {dictionary.productDetail.slugReceived}:{" "}
            <span className="font-mono text-slate-100">
              {params.slug || dictionary.productDetail.slugFallback}
            </span>
          </p>

          <div className="space-y-2 text-sm">
            <p className="text-slate-400">{dictionary.productDetail.availableSlugs}</p>
            <ul className="ml-4 list-disc space-y-1">
              {products.map((p) => (
                <li key={p.slug} className="font-mono text-xs">
                  {p.slug}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/${locale}/products`}
            className="inline-flex rounded-full border border-slate-600 px-4 py-2 text-xs hover:border-slate-300"
          >
            {dictionary.productDetail.backToCatalog}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050509]">
      {/* CABECERA */}
      <section className="border-b border-slate-900 bg-gradient-to-b from-black to-[#050509]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            {dictionary.productDetail.techSheet} · {categoryLabel}
          </p>

          <h1 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
            {product.code} · <span className="text-slate-100">{product.name}</span>
          </h1>

          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">{product.longDescription}</p>
        </div>
      </section>

      {/* CONTINGUT */}
      <section className="bg-[#050509]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
          {/* ESQUERRA */}
          <div className="space-y-8">
            {/* FOTO / VISUAL – placeholder per ara */}
            <div className="relative h-72 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-black shadow-2xl md:h-80">
              <div className="absolute inset-4 rounded-3xl border border-slate-700/80" />
              <div className="flex h-full items-end justify-between px-8 pb-7">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{dictionary.productDetail.imagePending}</p>
                <p className="text-[0.65rem] text-slate-500">{dictionary.productDetail.prototype}</p>
              </div>
            </div>

            {/* DESCRIPCIÓ */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{dictionary.productDetail.description}</h2>
              <p className="text-sm text-slate-200 md:text-base">{product.longDescription}</p>
            </div>

            {/* CARACTERÍSTIQUES */}
            {product.features?.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{dictionary.productDetail.features}</h2>
                <ul className="space-y-2 text-sm text-slate-200 md:text-base">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-1 h-1 w-1 rounded-full bg-red-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ESPECIFICACIONS */}
            {product.technicalSpecs?.length ? (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{dictionary.productDetail.technicalSpecs}</h2>
                <div className="divide-y divide-slate-800 overflow-hidden rounded-2xl border border-slate-800">
                  {product.technicalSpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-1 gap-4 bg-black/40 px-4 py-3 text-sm text-slate-200 last:bg-black/60 md:grid-cols-2"
                    >
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{spec.label}</p>
                      <p className="font-medium text-slate-100">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {product.notes && <p className="text-xs text-slate-500">{product.notes}</p>}
          </div>

          {/* DRETA: estat + CTA */}
          <aside className="space-y-4">
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-black/40 p-5">
              <h2 className="text-sm font-semibold text-slate-100">{dictionary.productDetail.statusTitle}</h2>

              <p className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200">
                {product.status}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-3 text-xs text-slate-300 md:text-sm">
                <div className="space-y-1">
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">{dictionary.productDetail.code}</p>
                  <p className="font-medium text-slate-100">{product.code}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">{dictionary.productDetail.category}</p>
                  <p className="font-medium text-slate-100">{product.category}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-black/40 p-5">
              <h2 className="text-sm font-semibold text-slate-100">{dictionary.productDetail.wantProduct}</h2>
              <p className="text-sm text-slate-300">{dictionary.productDetail.ctaDescription}</p>

              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href={`mailto:fdrarkstudio@gmail.com?subject=${encodeURIComponent(
                    `Info / pressupost · ${product.code}`,
                  )}`}
                  className="rounded-full bg-red-500 px-5 py-2 text-xs font-medium text-white transition hover:bg-red-600 md:text-sm"
                >
                  {dictionary.productDetail.cta}
                </a>
                <Link
                  href={`/${locale}/products`}
                  className="rounded-full border border-slate-600 px-5 py-2 text-xs font-medium text-slate-200 transition hover:border-slate-300 md:text-sm"
                >
                  {dictionary.productDetail.ctaSecondary}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
