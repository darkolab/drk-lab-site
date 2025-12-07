import { ProductsCatalog } from "@/components/products-catalog";
import { products } from "@/lib/products";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";

type ProductsPageProps = {
  params: { locale: string };
};

export default async function ProductsPage({ params }: ProductsPageProps) {
  const locale: Locale = resolveLocale(params.locale);
  const dictionary = await getDictionary(locale);

  return (
    <ProductsCatalog
      products={products}
      dictionary={dictionary.productsPage}
      locale={locale}
    />
  );
}
