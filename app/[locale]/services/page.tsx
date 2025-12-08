// app/[locale]/services/page.tsx
import { getDictionary, resolveLocale } from "@/lib/i18n";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dictionary = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-[#050509] text-slate-100">
      <section className="border-b border-slate-900 bg-black/40 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-2xl font-semibold text-white">{dictionary.servicesPage.title}</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300">{dictionary.servicesPage.description}</p>
        </div>
      </section>
      <section className="bg-[#050509] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-sm font-semibold text-white">{dictionary.servicesPage.subtitle}</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {dictionary.servicesPage.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
