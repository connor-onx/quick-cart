import Link from "next/link";
import Image from "next/image";

interface StyleWithCardProps {
  product: ProductMinimal;
}

export default function StyleWithCard({product}: StyleWithCardProps) {
  return (
    <Link
      href={`/${product.category}/${product.id}`}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          width={564}
          height={564}
        />
      </div>
      <div className="p-6 text-left">
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
        <h3 className="text-2xl mb-2 dark:text-white">{product.name}</h3>
        <p className="text-3xl text-blue-600 dark:text-blue-400">${product.price}</p>
      </div>
    </Link>
  )
}
