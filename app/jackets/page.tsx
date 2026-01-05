import PageHeader from "@/components/product-list-page/PageHeader";
import TopSoldSection from "@/components/product-list-page/TopSoldSection";
import AllProductsSection from "@/components/product-list-page/AllProductsSection";
import BackButton from "@/components/product-list-page/BackButton";
import CartButton from "@/components/product-list-page/CartButton";
import { getCategoryNameFromRoute } from "@/lib/utils";
import { getCategoryIdFromRoute } from "@/lib/server-utils";

export default function JacketsPage() {
  const categoryName = getCategoryNameFromRoute("jackets");
  const categoryId = getCategoryIdFromRoute("jackets");
  
  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="flex justify-between items-start mb-6">
        <BackButton />
        <CartButton />
      </div>
      <PageHeader categoryName={categoryName} />
      <TopSoldSection categoryRoute="jackets" categoryId={categoryId} />
      <AllProductsSection categoryRoute="jackets" categoryId={categoryId} />
    </main>
  )
}
