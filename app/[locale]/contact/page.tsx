// app/[locale]/contact/page.tsx
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";

type PageParams = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageParams) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const dictionary = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-[#050509] text-slate-100">
      <section className="border-b border-slate-900 bg-black/40 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-2xl font-semibold text-white">{dictionary.contactPage.title}</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300">{dictionary.contactPage.description}</p>
          {/* Más adelante: formulari de contacte o enllaç mailto */}
        </div>
      </section>
    </main>
  );
}
