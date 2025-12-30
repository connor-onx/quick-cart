"use client";

import AugmentedRealityCamera from "@/app/components/face-filter/canvas";
import Image from "next/image";

interface MediaContainerProps {
  product: Product;
  ARActive: boolean;
  selectedSize: ProductSize;
}

export default function MediaContainer({ product, ARActive, selectedSize }: MediaContainerProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl relative">
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover z-[20]"
          width={560}
          height={956}
        />
        <AugmentedRealityCamera modelPath="/models/scene.gltf" active={ARActive} size={selectedSize}/>
      </div>
    </div>
  )
}
