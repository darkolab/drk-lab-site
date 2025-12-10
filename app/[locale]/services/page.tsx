import { getDictionary, resolveLocale } from "@/lib/i18n";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dictionary = await getDictionary(locale);
  const t = dictionary.servicesPage;

  return (
    <main className="min-h-screen bg-[#050509] text-slate-100">
      {/* HERO */}
      <section className="border-b border-slate-900 bg-black/40 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-red-400">
            {t.heroKicker}
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
            {t.heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* LÍNEAS DE SERVICIO */}
      <section className="border-b border-slate-900 bg-[#050509] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-lg font-semibold text-white md:text-xl">
            {t.linesTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            {t.linesIntro}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {t.lines.map((item: { title: string; body: string }) => (
              <article
                key={item.title}
                className="h-full rounded-3xl border border-slate-800 bg-black/40 p-5 shadow-sm shadow-black/40"
              >
                <h3 className="text-sm font-semibold text-slate-50 md:text-base">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300 md:text-[0.95rem]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS TÍPICOS */}
      <section className="border-b border-slate-900 bg-black/20 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-lg font-semibold text-white md:text-xl">
            {t.casesTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            {t.casesIntro}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-slate-300 md:text-base">
            {t.cases.map((item: string) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* RENTALS / PRODUCCIONS */}
      <section className="border-b border-slate-900 bg-[#050509] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6 space-y-3">
          <h2 className="text-lg font-semibold text-white md:text-xl">
            {t.rentalsTitle}
          </h2>
          <p className="max-w-3xl text-sm text-slate-300 md:text-base">
            {t.rentalsBody}
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[#050509] py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-red-900/40 bg-gradient-to-br from-red-900/20 via-black to-red-950/40 px-6 py-8 md:px-8 md:py-10">
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              {t.ctaTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-200 md:text-base">
              {t.ctaBody}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center rounded-full border border-red-500/70 bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-500"
              >
                {t.ctaPrimaryLabel}
              </a>
              <a
                href={`/${locale}/custom`}
                className="inline-flex items-center rounded-full border border-slate-600 px-5 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-400"
              >
                {t.ctaSecondaryLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
