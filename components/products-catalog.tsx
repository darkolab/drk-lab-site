"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import type { Locale } from "@/lib/i18n";

const statusStyles = {
  default: {
    badge: "border-slate-700/70 bg-slate-900/60 text-slate-200",
    dot: "bg-slate-400/80",
  },
  prototype: {
    badge: "border-slate-700/70 bg-slate-900/60 text-slate-200",
    dot: "bg-amber-400",
  },
  production: {
    badge: "border-slate-700/70 bg-slate-900/60 text-slate-200",
    dot: "bg-cyan-300",
  },
};

export type ProductsDictionary = {
  title: string;
  description: string;
  filters: {
    all: string;
    categories: Record<string, string>;
  };
  viewSheet: string;
};

function getStatusStyle(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("prototip") || normalized.includes("prototype")) return statusStyles.prototype;
  if (normalized.includes("producció") || normalized.includes("produccion") || normalized.includes("production"))
    return statusStyles.production;
  return statusStyles.default;
}

function getCategoryKey(categoryKey?: string, category?: string) {
  return (categoryKey || category || "").toLowerCase();
}

function getCategoryLabel(key: string, categories: Record<string, string>) {
  return categories[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

export function ProductsCatalog({
  products,
  dictionary,
  locale,
}: {
  products: Product[];
  dictionary: ProductsDictionary;
  locale: Locale;
}) {
  const categoryFilters = useMemo(() => {
    const uniqueKeys = Array.from(
      new Set(products.map((product) => getCategoryKey(product.categoryKey, product.category))),
    ).filter(Boolean);

    return [{ key: "all", label: dictionary.filters.all }, ...uniqueKeys.map((key) => ({ key, label: getCategoryLabel(key, dictionary.filters.categories) }))];
  }, [dictionary.filters.all, dictionary.filters.categories, products]);

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((product) => getCategoryKey(product.categoryKey, product.category) === activeCategory);
  }, [activeCategory, products]);

  const withLocale = (href: string) => `/${locale}${href}`;

  return (
    <>
      <section className="border-b border-slate-900 bg-black/40 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-2xl font-semibold text-white">{dictionary.title}</h1>
          <p className="mt-3 max-w-4xl text-sm text-slate-300">{dictionary.description}</p>
        </div>
      </section>

      <section className="bg-[#050509] py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-12">
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

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 xl:gap-16 2xl:gap-20">
            {filteredProducts.map((product) => {
              const categoryKey = getCategoryKey(product.categoryKey, product.category);

              return (
                <article
                  key={product.slug}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-900/80 bg-gradient-to-br from-[#0a0a12] via-[#050509] to-black p-6 shadow-[0_32px_80px_-42px_rgba(0,0,0,0.8)]"
                >
                  <div className="relative h-80 overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-b from-slate-950 via-[#0a0a14] to-[#03030a]">
                    <div className="absolute inset-0 overflow-hidden" aria-hidden>
                      <div
                        className={`absolute inset-0 scale-100 bg-cover bg-center opacity-75 transition duration-700 ease-out group-hover:scale-[1.08] group-hover:opacity-100 ${
                          product.image ? "" : "bg-gradient-to-br from-slate-900 via-slate-950 to-black"
                        }`}
                        style={product.image ? { backgroundImage: `url(${product.image})` } : undefined}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/45 to-[#050509]/95" />
                      <div className="absolute inset-x-6 top-6 h-px bg-white/10" />
                      <div className="absolute inset-x-10 bottom-8 h-px bg-white/5" />
                      <div className="absolute left-6 top-1/2 h-16 w-px -translate-y-1/2 bg-white/10" />
                      <div className="absolute right-6 top-1/2 h-16 w-px -translate-y-1/2 bg-white/10" />
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050509]/90 via-black/40 to-transparent" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between p-6 text-slate-100">
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-slate-200">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 backdrop-blur">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-400" aria-hidden />
                          {product.category}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono tracking-[0.2em] text-white">
                          {product.code}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-slate-300">
                        <span className="h-px w-10 bg-slate-500/60" aria-hidden />
                        {getCategoryLabel(categoryKey, dictionary.filters.categories)} · DRK LAB
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-6 flex flex-1 flex-col justify-between rounded-2xl border border-slate-800 bg-gradient-to-br from-black/80 via-[#0b0b13]/90 to-[#050509]/90 p-6 shadow-inner transition duration-500 ease-out group-hover:-translate-y-1 group-hover:border-slate-700 group-hover:shadow-[0_28px_48px_-34px_rgba(0,0,0,0.8)]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-slate-400">
                        <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-white/90">
                          {product.category}
                        </span>
                        <span className="h-px flex-1 bg-slate-700/60" aria-hidden />
                        <span className="font-mono text-slate-300">{product.code}</span>
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-white md:text-2xl">
                          <Link href={withLocale(`/products/${product.slug}`)} className="transition hover:text-red-400">
                            {product.shortName}
                          </Link>
                        </h2>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{product.status}</p>
                      </div>

                      <p className="text-sm leading-relaxed text-slate-200/90 md:text-base">{product.shortDescription}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between pt-4 text-sm">
                      {(() => {
                        const statusStyle = getStatusStyle(product.status);
                        return (
                          <span
                            className={`inline-flex items-center gap-2 rounded-2xl border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] ${statusStyle.badge}`}
                          >
                            <span className={`h-2 w-2 rounded-full ${statusStyle.dot} opacity-80`} />
                            <span className="text-slate-200">{product.status}</span>
                          </span>
                        );
                      })()}

                      <Link
                        href={withLocale(`/products/${product.slug}`)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-red-500/60 bg-black/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-200 transition duration-300 hover:translate-x-[2px] hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-[0_12px_30px_-18px_rgba(248,113,113,0.7)]"
                      >
                        {dictionary.viewSheet}
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
    </>
  );
}
