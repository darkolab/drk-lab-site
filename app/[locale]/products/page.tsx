// app/[locale]/products/page.tsx
import { ProductsCatalog } from "@/components/products-catalog";
import { products } from "@/lib/products";
import { getDictionary, type Locale } from "@/lib/i18n";

type ProductsPageProps = {
  params: { locale: Locale };
};

export default async function ProductsPage({ params }: ProductsPageProps) {
  const locale = params.locale;
  const dictionary = await getDictionary(locale);

  return (
    <ProductsCatalog
      products={products}
      dictionary={dictionary.productsPage}
      locale={locale}
    />
  );
}
