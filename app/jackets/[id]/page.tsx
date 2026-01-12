import ProductInfoPageContainer from "@/components/product-info-page/ProductInfoPageContainer";

interface JacketPageProps {
  params: Promise<{ id: string }>;
}

export default async function JacketPage({ params }: JacketPageProps) {
  const { id } = await params;
  
  const url = `${process.env.BASE_URL}/api/product/${id}`;
  const res = await fetch(url);

  const jacket = await res.json();
  
  return (
    <main className="prose mx-auto p-4">
      <ProductInfoPageContainer product={jacket}/>
    </main>
  )
}
