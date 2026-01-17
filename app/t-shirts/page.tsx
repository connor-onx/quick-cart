import PageHeader from "@/components/product-list-page/PageHeader";
import TopSoldSection from "@/components/product-list-page/TopSoldSection";
import AllProductsSection from "@/components/product-list-page/AllProductsSection";
import BackButton from "@/components/shared/BackButton";
import ShoppingCartButton from "@/components/shared/ShoppingCartButton";
import ThemeToggleButton from "@/components/shared/ThemeToggleButton";
import { getCategoryIdFromRoute, getProductsByCategoryId } from "@/lib/server-utils";

export default function TShirtsPage() {
  const categoryName = "T-Shirts";
  const categoryId = getCategoryIdFromRoute("t-shirts");
  const backendProducts = getProductsByCategoryId(categoryId);
  const products: ProductMinimal[] = backendProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    images: p.images,
    category: "t-shirts",
  }));
  
  return (
    <main className="min-h-screen p-8 bg-background bg-gradient-to-b from-white to-white dark:from-gray-800 dark:to-gray-900">
      <div className="flex gap-4 mb-6">
        <BackButton className="mr-auto"/>
        <ThemeToggleButton/>
        <ShoppingCartButton/>
      </div>
      <PageHeader categoryName={categoryName}/>
      <TopSoldSection categoryRoute="t-shirts" products={products}/>
      <AllProductsSection categoryRoute="t-shirts" products={products}/>
    </main>
  )
}
