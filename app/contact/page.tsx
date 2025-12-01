// app/contact/page.tsx
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050509] text-slate-100">
      <section className="border-b border-slate-900 bg-black/40 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-2xl font-semibold text-white">Contacte</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300">
            Explica&apos;m què necessites i et respondré amb una proposta
            concreta: peça, timings i pressupost.
          </p>
          {/* Más adelante: formulari de contacte o enllaç mailto */}
        </div>
      </section>
    </main>
  );
}
