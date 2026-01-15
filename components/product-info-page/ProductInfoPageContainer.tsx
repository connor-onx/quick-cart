"use client";

import Metadata from "./Metadata";
import MediaContainer from "./MediaContainer";
import StyleWithCard from "./StyleWithCard";
import BackButton from "../shared/BackButton";
import ShoppingCartButton from "../shared/ShoppingCartButton";
import ThemeToggleButton from "../shared/ThemeToggleButton";

import { Button } from "../ui/button";
import { Camera, MapPin, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useShoppingCart } from "@/app/context/ShoppingCartContext";

interface ProductInfoPageContainerProps {
  product: Product;
}

export default function ProductInfoPageContainer({ product }: ProductInfoPageContainerProps) {

  const { open, dispatch } = useShoppingCart();

  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [ARActive, setARActive] = useState<boolean>(false);

  function enableAr() {
    setARActive(prev => !prev);
  }

  function openMap() {
    // Todo: Create and integrate with a map modal
  }

  function handleAddToCart(product: Product): void {
    dispatch({type: 'add', item: {product, size: selectedSize!, quantity: 1}});
    open();
  }

  return (
    <div className="relative min-h-screen p-8 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="flex gap-4 mb-8">
        <BackButton className="mr-auto"/>
        <ThemeToggleButton/>
        <ShoppingCartButton/>
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
        <footer className="fixed bottom-0 left-0 right-0 flex items-stretch gap-4 p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 shadow-2xl z-30 h-28">
          {product.modelPath
            ? <Button
                onClick={enableAr}
                disabled={!selectedSize}
                className={`flex-1 h-full rounded-3xl text-2xl sm:text-3xl transition-all duration-300 flex items-center justify-center gap-6 shadow-2xl ${selectedSize
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-purple-500/50 hover:scale-105 active:scale-95'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
              >
                <Camera className="w-10 h-10 sm:w-12 sm:h-12" />
                <span>Try with AR</span>
              </Button>
            : null
          }
          <Button
            onClick={openMap}
            className="flex-1 h-full rounded-3xl text-2xl sm:text-3xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
          >
            <MapPin className="w-10 h-10 sm:w-12 sm:h-12" />
            <span>Show me on map</span>
          </Button>
          <Button
            onClick={() => handleAddToCart(product)}
            disabled={!selectedSize}
            className={`flex-1 h-full rounded-3xl text-2xl sm:text-3xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${selectedSize
                ? 'bg-gradient-to-r from-green-600 to-lime-600 text-white hover:scale-105 active:scale-95'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
          >
            <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10" />
            <span>Add to Cart</span>
          </Button>
        </footer>
      </div>
    </div>
  )
}
