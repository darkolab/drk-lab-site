"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { products, getProductBySlug } from "@/lib/products";

export default function ProductDetailPage() {
  // Sacamos el slug de la URL: /products/drk-cap-led → "drk-cap-led"
  const pathname = usePathname();
  const slug =
    pathname
      ?.split("/")
      .filter(Boolean)
      .pop() ?? "";

  const product = slug ? getProductBySlug(slug) : undefined;

  const categoryLabel = product?.category
    ? product.category.toUpperCase()
    : "";

  // 🧪 DEBUG SI NO ENCUENTRA PRODUCTE
  if (!product) {
    return (
      <main className="min-h-screen bg-[#050509] text-slate-100">
        <div className="mx-auto max-w-4xl px-6 py-16 space-y-6">
          <h1 className="text-2xl font-semibold text-red-400">
            Producte no trobat
          </h1>

          <p className="text-sm text-slate-300">
            slug rebut:{" "}
            <span className="font-mono text-slate-100">
              {slug || "(sense slug)"}
            </span>
          </p>

          <div className="space-y-2 text-sm">
            <p className="text-slate-400">Slugs disponibles:</p>
            <ul className="ml-4 list-disc space-y-1">
              {products.map((p) => (
                <li key={p.slug} className="font-mono text-xs">
                  {p.slug}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/products"
            className="inline-flex rounded-full border border-slate-600 px-4 py-2 text-xs hover:border-slate-300"
          >
            ← Tornar al catàleg
          </Link>
        </div>
      </main>
    );
  }

  // 🎬 FICHA “DE GALA”
  return (
    <main className="min-h-screen bg-[#050509]">
      {/* CABECERA */}
      <section className="border-b border-slate-900 bg-gradient-to-b from-black to-[#050509]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            FITXA TÈCNICA · {categoryLabel}
          </p>

          <h1 className="mt-4 text-2xl md:text-3xl font-semibold text-white">
            {product.code} ·{" "}
            <span className="text-slate-100">{product.name}</span>
          </h1>

          <p className="mt-3 max-w-3xl text-sm md:text-base text-slate-300">
            {product.longDescription}
          </p>
        </div>
      </section>

      {/* CONTINGUT */}
      <section className="bg-[#050509]">
        <div className="mx-auto max-w-6xl px-6 py-10 grid gap-10 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
          {/* ESQUERRA */}
          <div className="space-y-8">
            {/* FOTO / VISUAL – placeholder per ara */}
            <div className="relative h-72 md:h-80 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-black shadow-2xl overflow-hidden">
              <div className="absolute inset-4 rounded-3xl border border-slate-700/80" />
              <div className="flex h-full items-end justify-between px-8 pb-7">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Imatge de producte pendent
                </p>
                <p className="text-[0.65rem] text-slate-500">
                  DRK LAB · prototip funcional
                </p>
              </div>
            </div>

            {/* DESCRIPCIÓ */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Descripció
              </h2>
              <p className="text-sm md:text-base text-slate-200">
                {product.longDescription}
              </p>
            </div>

            {/* CARACTERÍSTIQUES */}
            {product.features?.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Característiques
                </h2>
                <ul className="space-y-2 text-sm md:text-base text-slate-200">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-1 h-1 w-1 rounded-full bg-red-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.notes && (
              <p className="text-xs text-slate-500">{product.notes}</p>
            )}
          </div>

          {/* DRETA: estat + CTA */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-black/40 p-5 space-y-4">
              <h2 className="text-sm font-semibold text-slate-100">
                Estat del producte
              </h2>

              <p className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200">
                {product.status}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs md:text-sm text-slate-300 pt-3">
                <div className="space-y-1">
                  <p className="text-slate-500 text-[0.7rem] uppercase tracking-[0.18em]">
                    Codi
                  </p>
                  <p className="font-medium text-slate-100">{product.code}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 text-[0.7rem] uppercase tracking-[0.18em]">
                    Categoria
                  </p>
                  <p className="font-medium text-slate-100">
                    {product.category}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-black/40 p-5 space-y-3">
              <h2 className="text-sm font-semibold text-slate-100">
                Vols aquest producte?
              </h2>
              <p className="text-sm text-slate-300">
                DRK LAB treballa principalment sota comanda per a rentals,
                productores i tècnics. Explica&apos;m què necessites i mirem si
                aquest model encaixa o cal adaptar-lo.
              </p>

              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href={`mailto:fdrarkstudio@gmail.com?subject=${encodeURIComponent(
                    `Info / pressupost · ${product.code}`
                  )}`}
                  className="rounded-full bg-red-500 px-5 py-2 text-xs md:text-sm font-medium text-white hover:bg-red-600 transition"
                >
                  Demanar informació
                </a>
                <Link
                  href="/products"
                  className="rounded-full border border-slate-600 px-5 py-2 text-xs md:text-sm font-medium text-slate-200 hover:border-slate-300 transition"
                >
                  Tornar al catàleg
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
