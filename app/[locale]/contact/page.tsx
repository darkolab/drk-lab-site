// app/[locale]/contact/page.tsx
import { getDictionary, resolveLocale } from "@/lib/i18n";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dictionary = await getDictionary(locale);
  const t = dictionary.contactPage;

  return (
    <main className="min-h-screen bg-[#050509] text-slate-100">
      {/* HERO */}
      <section className="border-b border-slate-900 bg-black/40 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-red-400">
            {t.heroKicker}
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
            {t.description}
          </p>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="border-b border-slate-900 bg-[#050509] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* LADO IZQUIERDO: TIPOS DE PROYECTO */}
          <div>
            <h2 className="text-lg font-semibold text-white md:text-xl">
              {t.projectsTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
              {t.projectsIntro}
            </p>

            {Array.isArray(t.projectTypes) && (
              <ul className="mt-5 space-y-2 text-sm text-slate-300 md:text-base">
                {t.projectTypes.map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            )}

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              {t.workflowTitle}
            </h3>
            <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
              {t.workflowIntro}
            </p>

            {Array.isArray(t.workflowSteps) && (
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {t.workflowSteps.map(
                  (step: { title: string; body: string }, index: number) => (
                    <article
                      key={step.title}
                      className="rounded-2xl border border-slate-800 bg-black/40 p-4"
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-red-500/70 bg-black text-xs font-semibold text-red-400">
                        {index + 1}
                      </span>
                      <h4 className="mt-2 text-xs font-semibold text-slate-100 md:text-sm">
                        {step.title}
                      </h4>
                      <p className="mt-2 text-[0.8rem] leading-relaxed text-slate-300 md:text-sm">
                        {step.body}
                      </p>
                    </article>
                  ),
                )}
              </div>
            )}
          </div>

          {/* LADO DERECHO: TARJETA DE CONTACTO */}
          <aside className="flex flex-col">
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/70 via-black to-slate-950/80 p-6 shadow-xl shadow-black/40">
              <h2 className="text-base font-semibold text-white md:text-lg">
                {t.panelTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-300 md:text-[0.95rem]">
                {t.panelBody}
              </p>

              <div className="mt-5 space-y-1 text-sm">
                <p className="font-medium text-slate-200">{t.emailLabel}</p>
                <a
                  href={`mailto:${t.email}`}
                  className="break-all text-sm font-semibold text-red-400 hover:text-red-300"
                >
                  {t.email}
                </a>
                <p className="mt-1 text-xs text-slate-400">{t.emailHelper}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${t.email}?subject=${encodeURIComponent(
                    t.emailSubject || "Projecte DRK LAB",
                  )}`}
                  className="inline-flex items-center rounded-full border border-red-500/70 bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-500"
                >
                  {t.ctaPrimaryLabel}
                </a>
                <a
                  href={`/${locale}/products`}
                  className="inline-flex items-center rounded-full border border-slate-600 px-5 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-400"
                >
                  {t.ctaSecondaryLabel}
                </a>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500 md:text-[0.8rem]">
              {t.responseTimeNote}
            </p>
          </aside>
        </div>
      </section>

      {/* CTA FINAL SUAVE */}
      <section className="bg-[#050509] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            {t.footerKicker}
          </p>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            {t.footerBody}
          </p>
        </div>
      </section>
    </main>
  );
}
