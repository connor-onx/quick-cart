"use client";

import { useState, useEffect } from "react";
import AllProductsCard from "./AllProductsCard";
import { ProductMinimal } from "@/app/types/shared";

interface AllProductsSectionProps {
  categoryRoute: string;
  categoryId: string | null;
}

export default function AllProductsSection({ categoryRoute, categoryId }: AllProductsSectionProps) {
  const [products, setProducts] = useState<ProductMinimal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (!categoryId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/product?category-id=${categoryId}`);
        const data = await response.json();
        
        // Transform BackendProduct to ProductMinimal
        const transformedProducts: ProductMinimal[] = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          images: p.images,
          category: categoryRoute,
        }));

        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryId, categoryRoute]);

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-black mb-6">All Products</h2>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : products.length === 0 ? (
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
  );
}

