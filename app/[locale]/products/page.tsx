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

  // Mapa opcional de copias por slug:
  // "productCopy": { "drk-cap-led": { name: "...", shortDescription: "..." } }
  const productCopyMap =
    (dictionary as any).productCopy as
      | Record<string, ProductCopy>
      | undefined;

  const translatedProducts = products.map((product) => {
    const copy =
      productCopyMap?.[
        product.slug as keyof typeof productCopyMap
      ] as ProductCopy | undefined;

    if (!copy) return product;

    // Hacemos override solo de los campos de texto que vengan en la copia
    return {
      ...product,
      ...copy,
    };
  });

  return (
    <ProductsCatalog
      products={translatedProducts}
      dictionary={dictionary.productsPage}
      locale={locale}
    />
  );
}
