// app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050509] text-slate-100">
      <section className="border-b border-slate-900 bg-black/40 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-2xl font-semibold text-white">Sobre DRK LAB</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300">
            DRK LAB és el laboratori personal de Francesc Romero, tècnic de
            cinema i impressor 3D compulsiu. Dissenyant i imprimint des del
            Maresme per a rodatges d&apos;arreu.
          </p>
        </div>
      </section>
    </main>
  );
}
