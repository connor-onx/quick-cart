import AllProductsCard from "./AllProductsCard";

interface AllProductsSectionProps {
  categoryRoute: string;
  products: ProductMinimal[];
}

export default function AllProductsSection({ categoryRoute, products }: AllProductsSectionProps) {
  const hasProducts = products.length > 0;

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-black mb-6">All Products</h2>

      {!hasProducts ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <AllProductsCard
              key={product.id}
              product={product}
              categoryRoute={categoryRoute}
            />
          ))}
        </div>
      )}
    </section>
  )
}

