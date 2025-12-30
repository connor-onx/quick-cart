"use client";

import { Button } from "../ui/button";

interface MetadataProps {
  product: Product;
  selectedSize: ProductSize;
  setSelectedSize: (size: ProductSize) => void;
}

export default function Metadata({ product, selectedSize, setSelectedSize }: MetadataProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl mb-8 flex-grow">
      <h1 className="text-5xl mb-4 dark:text-white">{product.name}</h1>
      <p className="text-4xl text-blue-600 dark:text-blue-400 mb-6">${product.price}</p>
      <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">{product.description}</p>
      <div className="mb-8">
        <h2 className="text-3xl mb-6 dark:text-white">Select Size</h2>
        <div className="grid grid-cols-3 gap-4">
          {product.sizes.map((size) => (
            <Button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-6 px-4 h-auto rounded-2xl text-2xl transition-all duration-200 active:scale-95 ${selectedSize === size
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
