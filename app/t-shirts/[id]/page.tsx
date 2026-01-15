import ProductInfoPageContainer from "@/components/product-info-page/ProductInfoPageContainer";

interface TShirtPageProps {
  params: Promise<{ id: string }>;
}

export default async function TShirtPage({ params }: TShirtPageProps) {
  const { id } = await params;
  
  const url = `${process.env.BASE_URL}/api/product/${id}`;
  const res = await fetch(url);

  const tshirt = await res.json();
  
  return (
    <main className="prose mx-auto">
      <ProductInfoPageContainer product={tshirt}/>
    </main>
  )
}
