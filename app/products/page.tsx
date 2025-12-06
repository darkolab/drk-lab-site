"use client";

// app/products/page.tsx
import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";

const statusStyles = {
  default: "border-slate-700 text-slate-200",
  prototype: "border-orange-400/70 text-orange-200",
  production: "border-lime-400/70 text-lime-200",
};

const CATEGORY_LABELS: Record<string, string> = {
  llum: "Llum",
  monitors: "Monitors",
  media: "Media",
  merch: "Merch",
  grip: "Grip",
  camera: "Càmera",
};

function getStatusStyle(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("prototip")) return statusStyles.prototype;
  if (normalized.includes("producció")) return statusStyles.production;
  return statusStyles.default;
}

function getCategoryKey(categoryKey?: string, category?: string) {
  return (categoryKey || category || "").toLowerCase();
}

function getCategoryLabel(key: string) {
  return CATEGORY_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

export default function ProductsPage() {
  const categoryFilters = useMemo(() => {
    const uniqueKeys = Array.from(
      new Set(products.map((product) => getCategoryKey(product.categoryKey, product.category))),
    ).filter(Boolean);

    return [{ key: "all", label: "Tots" }, ...uniqueKeys.map((key) => ({ key, label: getCategoryLabel(key) }))];
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((product) => getCategoryKey(product.categoryKey, product.category) === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-[#050509] text-slate-100">
      <section className="border-b border-slate-900 bg-black/40 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-2xl font-semibold text-white">Catàleg de productes DRK LAB</h1>
          <p className="mt-3 max-w-4xl text-sm text-slate-300">
            Accessoris dissenyats per a càmeres, llum i monitors, pensats per a rentals i equips de rodatge. Peces fetes per
            treballar i resistir en set.
          </p>
        </div>
      </section>

      <section className="bg-[#050509] py-14">
        <div className="mx-auto max-w-7xl px-6 space-y-10">
          <div className="flex flex-wrap gap-3">
            {categoryFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveCategory(filter.key)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                  activeCategory === filter.key
                    ? "border-red-400 bg-red-500/10 text-white shadow-[0_10px_30px_-20px_rgba(248,113,113,0.6)]"
                    : "border-slate-700 bg-black/40 text-slate-200 hover:border-slate-500"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-current opacity-70" aria-hidden />
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
            {filteredProducts.map((product) => {
              const categoryKey = getCategoryKey(product.categoryKey, product.category);

              return (
                <article
                  key={product.slug}
                  className="group relative flex h-full flex-col rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950/80 via-black to-[#050509] p-6 shadow-[0_25px_60px_-35px_rgba(0,0,0,0.7)]"
                >
                  <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-b from-slate-900 via-slate-950 to-black">
                    {product.image && (
                      <div className="absolute inset-0 overflow-hidden" aria-hidden>
                        <div
                          className="absolute inset-0 scale-100 bg-cover bg-center opacity-80 transition duration-700 ease-out group-hover:scale-[1.07] group-hover:opacity-100"
                          style={{ backgroundImage: `url(${product.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-[#050509]/90" />
                      </div>
                    )}

                    <div className="relative z-10 flex h-full flex-col justify-between p-5 text-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                          {product.category}
                        </span>
                        <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-slate-200">
                          {product.code}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-300">
                        <span className="h-px w-8 bg-slate-500/60" aria-hidden />
                        {getCategoryLabel(categoryKey)} · DRK LAB
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-5 flex flex-1 flex-col justify-between rounded-2xl border border-slate-800 bg-black/70 p-5 shadow-inner transition duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-30px_rgba(0,0,0,0.7)]">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-white">
                          <Link href={`/products/${product.slug}`} className="transition hover:text-red-400">
                            {product.shortName}
                          </Link>
                        </h2>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{product.status}</p>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-200/90 md:text-base">{product.shortDescription}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between pt-4 text-sm">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] uppercase tracking-[0.14em] ${getStatusStyle(
                          product.status,
                        )}`}
                      >
                        <span className="h-2 w-2 rounded-full bg-current opacity-70" />
                        {product.status}
                      </span>

                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-red-600"
                      >
                        Veure fitxa
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-b-3xl bg-gradient-to-t from-red-500/10 via-transparent to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
