import ProductInfoPageContainer from "@/components/product-info-page/ProductInfoPageContainer";

interface PantPageProps {
  params: Promise<{ id: string }>;
}

export default async function PantPage({ params }: PantPageProps) {
  const { id } = await params;
  
  const url = `${process.env.BASE_URL}/api/product/${id}`;
  const res = await fetch(url);

  const hat = await res.json();
  
  return (
    <main className="prose mx-auto p-4">
      <ProductInfoPageContainer product={hat}/>
    </main>
  )
}
