import ProductInfoPageContainer from "@/components/product-info-page/ProductInfoPageContainer";

interface ShirtPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShirtPage({ params }: ShirtPageProps) {
  const { id } = await params;
  
  const url = `${process.env.BASE_URL}/api/product/${id}`;
  const res = await fetch(url);

  const shirt = await res.json();
  
  return (
    <main className="prose mx-auto">
      <ProductInfoPageContainer product={shirt}/>
    </main>
  )
}
