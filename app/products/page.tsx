// app/products/page.tsx
import Link from "next/link";
import { products } from "@/lib/products";

const statusStyles = {
  default: "border-slate-700 text-slate-200",
  prototype: "border-orange-400/70 text-orange-200",
  production: "border-lime-400/70 text-lime-200",
};

function getStatusStyle(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("prototip")) return statusStyles.prototype;
  if (normalized.includes("producció")) return statusStyles.production;
  return statusStyles.default;
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#050509] text-slate-100">
      {/* HERO / INTRO CATÀLEG */}
      <section className="border-b border-slate-900 bg-black/40 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-red-400/90">
            Catàleg · DRK LAB
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            Catàleg de productes DRK LAB
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-[15px]">
            Accessoris dissenyats per a càmeres, llum i monitors, pensats per a rentals i equips de rodatge.
            Peces fetes per treballar i resistir en set, amb marge per adaptar-les a cada producció.
          </p>
        </div>
      </section>

      {/* LLISTAT DE PRODUCTES */}
      <section className="bg-[#050509] py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.slug}
                className="group relative flex min-h-[220px] flex-col justify-between rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950/80 via-black to-[#050509] p-7 shadow-[0_25px_60px_-35px_rgba(0,0,0,0.7)] transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:border-red-500/70 hover:shadow-red-500/20"
              >
                {/* CONTINGUT PRINCIPAL */}
                <div className="space-y-4">
                  {/* Categoria + codi */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center rounded-full border border-slate-700/70 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200">
                      {product.category}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      {product.code}
                    </span>
                  </div>

                  {/* Nom + descripció curta */}
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white md:text-2xl">
                      <Link
                        href={`/products/${product.slug}`}
                        className="transition-colors hover:text-red-400"
                      >
                        {product.shortName}
                      </Link>
                    </h2>
                    <p className="text-sm text-slate-300 line-clamp-3">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>

                {/* ESTAT + CTA */}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-3 pt-4 text-sm">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.16em] ${getStatusStyle(
                      product.status,
                    )}`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current opacity-80" />
                    {product.status}
                  </span>

                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-red-600"
                  >
                    Veure fitxa
                    <span aria-hidden>→</span>
                  </Link>
                </div>

                {/* GLOW SUAU EN HOVER */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-b-3xl bg-gradient-to-t from-red-500/8 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
