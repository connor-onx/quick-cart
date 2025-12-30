import ProductInfoPageContainer from "@/components/product-info-page/ProductInfoPageContainer";

interface HatPageProps {
  params: Promise<{ id: string }>;
}

export default async function HatPage({ params }: HatPageProps) {
  const { id } = await params;
  
  // Todo: Replace with env variable
  const url = `http://localhost:3000/api/product/${id}`;
  const res = await fetch(url);

  const hat = await res.json();
  
  return (
    <main className="prose mx-auto p-4">
      <ProductInfoPageContainer product={hat} />
    </main>
  )
}
