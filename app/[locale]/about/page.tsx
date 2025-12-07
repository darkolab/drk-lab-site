// app/[locale]/about/page.tsx
import { getDictionary, resolveLocale } from "@/lib/i18n";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = resolveLocale(params.locale);
  const dictionary = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-[#050509] text-slate-100">
      <section className="border-b border-slate-900 bg-black/40 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-2xl font-semibold text-white">{dictionary.aboutPage.title}</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300">{dictionary.aboutPage.description}</p>
        </div>
      </section>
    </main>
  );
}
