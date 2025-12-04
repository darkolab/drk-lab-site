// app/page.tsx
import Link from "next/link";
import { products } from "@/lib/products";
import { Hero } from "@/components/hero";


export default function Home() {
  const featuredSlugs = [
    "drk-cap-led",
    "drk-case-media",
    "drk-merch-pro",
  ];

  let featuredProducts = products.filter((p) =>
    featuredSlugs.includes(p.slug)
  );

  // Fallback por si un día borras alguno de esos slugs
  if (featuredProducts.length === 0) {
    featuredProducts = products.slice(0, 3);
  }

    return (
    <main className="min-h-screen">

     {/* HERO COMPLET – text + slide sincronitzat */}
      <Hero />

      {/* SERVEIS */}
      <section
        id="serveis"
        className="border-b border-slate-900 bg-[#050509] py-16"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-2xl font-semibold text-white">
            Què fa DRK LAB?
          </h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] md:text-base text-slate-300">
            DRK LAB neix de la barreja entre un magatzem de rental i un
            laboratori 3D. Detectem problemes reals a set i dissenyem peces
            específiques perquè deixin de ser un problema.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-black/40 p-5">
              <p className="text-[0.95rem] md:text-base font-semibold text-slate-100">
                Disseny 3D per a rodatges
              </p>
              <p className="mt-3 text-[0.95rem] md:text-base text-slate-300">
                Peces pensades per al dia a dia: proteccions, tapes, suports,
                adaptadors i solucions que no existeixen al catàleg dels
                fabricants.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-black/40 p-5">
              <p className="text-[0.95rem] md:text-base font-semibold text-slate-100">
                Impressió amb materials tècnics
              </p>
              <p className="mt-3 text-[0.95rem] md:text-base text-slate-300">
                PLA d'alta qualitat, compostos amb fibra i materials
                pensats per aguantar cops, calor i maltracte de set.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-black/40 p-5">
              <p className="text-[0.95rem] md:text-base font-semibold text-slate-100">
                Prototipatge ràpid per a rentals i productores
              </p>
              <p className="mt-3 text-[0.95rem] md:text-base text-slate-300">
                Del problema a la peça funcional en pocs dies, amb iteracions
                ràpides fins trobar el fit perfecte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTES DESTACATS */}
      <section
        id="productes"
        className="border-b border-slate-900 bg-[#050509] py-16"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-2xl font-semibold text-white">
            Productes destacats
          </h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] md:text-base text-slate-300">
            Algunes de les peces que ja estan funcionant cada dia en rentals i
            equips de rodatge.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.slug}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-black/40 p-5"
              >
                <div>
                  <h3 className="text-[0.95rem] md:text-base font-semibold text-slate-100">
                    <Link
                      href={`/products/${product.slug}`}
                      className="hover:text-red-400"
                    >
                      {product.code} · {product.shortName ?? product.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[0.95rem] md:text-base text-slate-300">
                    {product.shortDescription}
                  </p>
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  {product.statusLabel}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 text-sm">
            <Link
              href="/products"
              className="text-red-400 hover:text-red-300"
            >
              Veure tot el catàleg →
            </Link>
          </div>
        </div>
      </section>

      {/* A MIDA */}
      <section
        id="custom"
        className="border-b border-slate-900 bg-[#050509] py-16"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-2xl font-semibold text-white">
            Peces a mida per al teu equip
          </h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] md:text-base text-slate-300">
            Tens una càmera, un monitor o un focus que necessita una peça
            específica? DRK LAB pot dissenyar i fabricar una solució feta per
            al teu flux de treball.
          </p>
          <ul className="mt-6 space-y-2 text-[0.95rem] md:text-base text-slate-300">
            <li>· Adaptadors i suports per a càmeres i accessoris.</li>
            <li>· Proteccions per a transport en flightcases.</li>
            <li>· Peces que ja no es fabriquen o mai han existit.</li>
          </ul>
        </div>
      </section>

      {/* SOBRE MI */}
      <section id="sobre" className="bg-[#050509] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-2xl font-semibold text-white">
            Qui hi ha darrere de DRK LAB?
          </h2>
          <p className="mt-4 max-w-3xl text-[0.95rem] md:text-base text-slate-300">
            DRK LAB és el projecte personal de Fran, tècnic audiovisual i
            director de fotografia. Treballant diàriament amb càmeres, òptiques
            i llum en un rental, he vist de prop què es trenca, què es perd i
            què falta a les maletes. D'aquí neixen les peces de DRK LAB:
            solucions petites que resolen problemes molt concrets.
          </p>
        </div>
      </section>

      {/* CONTACTE */}
      <section
        id="contacte"
        className="border-t border-slate-900 bg-black py-10"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-xl font-semibold text-white">Contacte</h2>
          <p className="mt-3 text-[0.95rem] md:text-base text-slate-300">
            Si ets un rental, una productora o un tècnic freelance i tens una
            idea o un problema a set, escriu-me i en parlem.
          </p>
          <p className="mt-4 text-[0.95rem] md:text-base text-slate-100">
            Correu:{" "}
            <a
              href="mailto:fdrarkstudio@gmail.com"
              className="text-red-400 hover:text-red-300"
            >
              fdrarkstudio@gmail.com
            </a>
          </p>
          <p className="mt-8 text-xs text-slate-500">
            Fet a Catalunya per a rodatges de tot arreu.
          </p>
        </div>
      </section>
    </main>
  );
}
