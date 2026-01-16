import PageHeader from "@/components/product-list-page/PageHeader";
import TopSoldSection from "@/components/product-list-page/TopSoldSection";
import AllProductsSection from "@/components/product-list-page/AllProductsSection";
import BackButton from "@/components/shared/BackButton";
import ShoppingCartButton from "@/components/shared/ShoppingCartButton";
import ThemeToggleButton from "@/components/shared/ThemeToggleButton";
import { getCategoryIdFromRoute, getProductsByCategoryId } from "@/lib/server-utils";

export default function HatsPage() {
  const categoryName = "Hats";
  const categoryId = getCategoryIdFromRoute("hats");
  const backendProducts = getProductsByCategoryId(categoryId);
  const products: ProductMinimal[] = backendProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    images: p.images,
    category: "hats",
  }));
  
  return (
    <main className="min-h-screen p-6 bg-background">
      <div className="flex gap-4 mb-6">
        <BackButton className="mr-auto"/>
        <ThemeToggleButton/>
        <ShoppingCartButton/>
      </div>
      <PageHeader categoryName={categoryName}/>
      <TopSoldSection categoryRoute="hats" products={products}/>
      <AllProductsSection categoryRoute="hats" products={products}/>
    </main>
  )
}
