import { ProductsCatalog } from "@/components/products-catalog";
import { products } from "@/lib/products";
import { getDictionary, resolveLocale } from "@/lib/i18n";

export default async function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = resolveLocale(params.locale);
  const dictionary = await getDictionary(locale);

  return <ProductsCatalog products={products} dictionary={dictionary.productsPage} locale={locale} />;
}
