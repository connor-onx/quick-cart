import ProductInfoPageContainer from "@/components/product-info-page/ProductInfoPageContainer";

interface DressPageProps {
  params: Promise<{ id: string }>;
}

export default async function DressPage({ params }: DressPageProps) {
  const { id } = await params;
  
  const url = `${process.env.BASE_URL}/api/product/${id}`;
  const res = await fetch(url);

  const dress = await res.json();
  
  return (
    <main className="prose mx-auto">
      <ProductInfoPageContainer product={dress}/>
    </main>
  )
}
