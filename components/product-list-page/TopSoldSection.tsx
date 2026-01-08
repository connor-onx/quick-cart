"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TopSoldProductCard from "./TopSoldProductCard";

interface TopSoldSectionProps {
  categoryRoute: string;
  categoryId: string | null;
}

type TimeFilter = "today" | "this-week" | "this-month" | "this-year";

export default function TopSoldSection({ categoryRoute, categoryId }: TopSoldSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<TimeFilter>("today");
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
        const transformedProducts: ProductMinimal[] = data.map((p: BackendProduct) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          images: p.images,
          category: categoryRoute,
        }));

        // For now, we'll just take the first 3 products as "top sold"
        // In a real app, this would be sorted by sales data filtered by time period
        setProducts(transformedProducts.slice(0, 3));
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryId, categoryRoute, selectedFilter]);

  const filters = [
    { value: "today" as TimeFilter, label: "Today" },
    { value: "this-week" as TimeFilter, label: "This Week" },
    { value: "this-month" as TimeFilter, label: "This Month" },
    { value: "this-year" as TimeFilter, label: "This Year" },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-black">Top Sold</h2>
        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedFilter === filter.value ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter.value)}
              className={
                selectedFilter === filter.value
                  ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600 rounded-md"
                  : "bg-white text-blue-600 hover:bg-gray-50 border-gray-200 rounded-md"
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <TopSoldProductCard
              key={product.id}
              product={product}
              rank={index + 1}
              categoryRoute={categoryRoute}
            />
          ))}
        </div>
      )}
    </section>
  );
}

