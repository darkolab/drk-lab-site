import { ProductsCatalog } from "@/components/products-catalog";
import { products } from "@/lib/products";
import { defaultLocale, getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale)
    ? (params.locale as Locale)
    : defaultLocale;
  const dictionary = await getDictionary(locale);

  return <ProductsCatalog products={products} dictionary={dictionary.productsPage} locale={locale} />;
}
