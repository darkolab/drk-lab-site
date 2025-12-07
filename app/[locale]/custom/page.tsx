// app/[locale]/custom/page.tsx
import { defaultLocale, getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function CustomPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale)
    ? (params.locale as Locale)
    : defaultLocale;
  const dictionary = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-[#050509] text-slate-100">
      <section className="border-b border-slate-900 bg-black/40 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-2xl font-semibold text-white">{dictionary.customPage.title}</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300">{dictionary.customPage.description}</p>
        </div>
      </section>
    </main>
  );
}
