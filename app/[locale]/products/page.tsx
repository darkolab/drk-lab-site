// app/[locale]/products/page.tsx
import { ProductsCatalog } from "@/components/products-catalog";
import { products } from "@/lib/products";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = resolveLocale(rawLocale);
  const dictionary = await getDictionary(locale);

  return (
    <ProductsCatalog
      products={products}
      dictionary={dictionary.productsPage}
      locale={locale}
    />
  );
}
