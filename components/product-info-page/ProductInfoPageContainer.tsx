"use client";

import Metadata from "./Metadata";
import MediaContainer from "./MediaContainer";
import Link from "next/link";
import StyleWithCard from "./StyleWithCard";
import { Button } from "../ui/button";
import { ArrowLeft, Camera, MapPin } from "lucide-react";
import { useState } from "react";

interface ProductInfoPageContainerProps {
  product: Product;
}

export default function ProductInfoPageContainer({ product }: ProductInfoPageContainerProps) {

  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [ARActive, setARActive] = useState<boolean>(false);

  function enableAr() {
    setARActive(prev => !prev);
  }

  function openMap() {
    // Todo: Create and integrate with a map modal
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="mb-8">
        <Link
          href="/hats"
          className="flex items-center gap-4 text-3xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors active:scale-95"
        >
          <ArrowLeft className="w-10 h-10" />
          Back
        </Link>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-8">
          <MediaContainer product={product} ARActive={ARActive} selectedSize={selectedSize}/>
          <div className="flex flex-col">
            <Metadata 
              product={product} 
              selectedSize={selectedSize} 
              setSelectedSize={setSelectedSize}
            />
            <Button
              onClick={enableAr}
              disabled={!selectedSize}
              className={`w-full h-auto py-12 rounded-3xl text-4xl transition-all duration-300 flex items-center justify-center gap-6 shadow-2xl mb-4 ${selectedSize
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-purple-500/50 hover:scale-105 active:scale-95'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
            >
              <Camera className="w-16 h-16" />
              <span>Try with AR</span>
            </Button>
            <Button
              onClick={openMap}
              className="w-full h-auto py-12 rounded-3xl text-4xl transition-all duration-300 flex items-center justify-center gap-6 shadow-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
            >
              <MapPin className="w-16 h-16" />
              <span>Show me on map</span>
            </Button>
          </div>
        </div>
        {product.relatedProducts.length > 0
          ? <div className="mt-12">
              <h2 className="text-4xl mb-6 dark:text-white">Style It With</h2>
              <div className="grid grid-cols-2 gap-6">
                {product.relatedProducts.map((relatedProduct) => (
                  <StyleWithCard key={relatedProduct.id} product={relatedProduct}/>
                ))}
              </div>
            </div>
          : null
        }
      </div>
    </div>
  )
}
