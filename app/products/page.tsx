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
      <section className="border-b border-slate-900 bg-black/40 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-2xl font-semibold text-white">Catàleg de productes DRK LAB</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Accessoris dissenyats per a càmeres, llum i monitors, pensats per a rentals i equips de rodatge. Peces fetes per
            treballar i resistir en set.
          </p>
        </div>
      </section>

      <section className="bg-[#050509] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.slug}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950/80 via-black to-[#050509] p-6 shadow-[0_25px_60px_-35px_rgba(0,0,0,0.7)]"
              >
                {product.image && (
                  <div className="absolute inset-0">
                    <div
                      className="absolute inset-0 scale-100 bg-cover bg-center opacity-75 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                      style={{ backgroundImage: `url(${product.image})` }}
                      aria-hidden
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#050509]/95" aria-hidden />
                  </div>
                )}

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="space-y-4 transition duration-500 ease-out group-hover:-translate-y-1 group-hover:opacity-90">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex items-center rounded-full border border-slate-700/70 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200">
                        {product.category}
                      </span>
                      <span className="text-xs text-slate-400">{product.code}</span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-white">
                        <Link href={`/products/${product.slug}`} className="transition hover:text-red-400">
                          {product.shortName}
                        </Link>
                      </h2>
                      <p className="text-sm text-slate-200/90 md:text-slate-200">
                        {product.shortDescription}
                      </p>
                    </div>
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
