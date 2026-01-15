"use client";

import AugmentedRealityCamera from "@/components/face-filter/canvas";
import Image from "next/image";

interface MediaContainerProps {
  product: Product;
  ARActive: boolean;
  selectedSize: ProductSize;
}

export default function MediaContainer({ product, ARActive, selectedSize }: MediaContainerProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl relative">
      <Image
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-cover z-[20]"
        width={560}
        height={956}
      />
      {product.modelPath
        ? <AugmentedRealityCamera modelPath={product.modelPath} active={ARActive} size={selectedSize}/>
        : null
      }
    </div>
  )
}
