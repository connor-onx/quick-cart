"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import TopSoldProductCard from "./TopSoldProductCard";


type TimeFilter = "today" | "this-week" | "this-month" | "this-year";

export default function TopSoldSection({ categoryRoute, products }: TopSoldSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<TimeFilter>("today");
  const displayProducts = products.slice(0, 3);

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
      {products.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProducts.map((product, index) => (
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
  )
}

