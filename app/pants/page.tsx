import PageHeader from "@/components/product-list-page/PageHeader";
import TopSoldSection from "@/components/product-list-page/TopSoldSection";
import AllProductsSection from "@/components/product-list-page/AllProductsSection";
import BackButton from "@/components/product-list-page/BackButton";
import CartButton from "@/components/product-list-page/CartButton";
import { getCategoryNameFromRoute } from "@/lib/utils";
import { getCategoryIdFromRoute } from "@/lib/server-utils";

export default function PantsPage() {
  const categoryName = getCategoryNameFromRoute("pants");
  const categoryId = getCategoryIdFromRoute("pants");
  
  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="flex justify-between items-start mb-6">
        <BackButton />
        <CartButton />
      </div>
      <PageHeader categoryName={categoryName} />
      <TopSoldSection categoryRoute="pants" categoryId={categoryId} />
      <AllProductsSection categoryRoute="pants" categoryId={categoryId} />
    </main>
  )
}
