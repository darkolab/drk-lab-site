// app/products/page.tsx
import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#050509] text-slate-100">
      <section className="border-b border-slate-900 bg-black/40 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-2xl font-semibold text-white">
            Catàleg de productes DRK LAB
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            Accessoris dissenyats per a càmeres, llum i monitors, pensats per a
            rentals i equips de rodatge.
          </p>
        </div>
      </section>

      <section className="bg-[#050509] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.slug}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-black/40 p-5"
              >
                <div>
                  <h2 className="text-sm font-semibold text-slate-100">
                    <Link
                      href={`/products/${product.slug}`}
                      className="hover:text-red-400"
                    >
                      {product.code} · {product.shortName}
                    </Link>
                  </h2>
                  <p className="mt-2 text-xs text-slate-400">
                    Categoria: {product.category}
                  </p>
                  <p className="mt-3 text-sm text-slate-300">
                    {product.shortDescription}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>{product.status}</span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-red-400 hover:text-red-300"
                  >
                    Veure fitxa →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
