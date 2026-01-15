import ProductInfoPageContainer from "@/components/product-info-page/ProductInfoPageContainer";

interface HatPageProps {
  params: Promise<{ id: string }>;
}

export default async function HatPage({ params }: HatPageProps) {
  const { id } = await params;
  
  const url = `${process.env.BASE_URL}/api/product/${id}`;
  const res = await fetch(url);

  const hat = await res.json();
  
  return (
    <main className="prose mx-auto">
      <ProductInfoPageContainer product={hat}/>
    </main>
  )
}
