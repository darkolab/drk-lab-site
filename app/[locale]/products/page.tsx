import { notFound } from "next/navigation";
import { ProductsCatalog } from "@/components/products-catalog";
import { products } from "@/lib/products";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);

  return <ProductsCatalog products={products} dictionary={dictionary.productsPage} locale={locale} />;
}
