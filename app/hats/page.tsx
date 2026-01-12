import PageHeader from "@/components/product-list-page/PageHeader";
import TopSoldSection from "@/components/product-list-page/TopSoldSection";
import AllProductsSection from "@/components/product-list-page/AllProductsSection";
import BackButton from "@/components/product-list-page/BackButton";
import CartButton from "@/components/product-list-page/CartButton";
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
    <main className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="flex justify-between items-start mb-6">
        <BackButton/>
        <CartButton/>
      </div>
      <PageHeader categoryName={categoryName}/>
      <TopSoldSection categoryRoute="hats" products={products}/>
      <AllProductsSection categoryRoute="hats" products={products}/>
    </main>
  )
}
