// app/services/page.tsx
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#050509] text-slate-100">
      <section className="border-b border-slate-900 bg-black/40 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-2xl font-semibold text-white">Serveis</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300">
            DRK LAB dona suport a rentals, productores i foquistes amb disseny
            i fabricació d&apos;accessoris 3D per a rodatges reals.
          </p>
        </div>
      </section>
      <section className="bg-[#050509] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-sm font-semibold text-white">
            Què puc fer per al teu rodatge
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>· Accessoris per a càmeres, rigs i monitors.</li>
            <li>· Peces per a caps LED i modificadors de llum.</li>
            <li>· Disseny a mida per a necessitats molt concretes.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
