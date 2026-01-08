import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AllProductsCardProps {
  product: ProductMinimal;
  categoryRoute: string;
}

export default function AllProductsCard({ 
  product, 
  categoryRoute 
}: AllProductsCardProps) {
  return (
    <Link href={`/${categoryRoute}/${product.id}`} className="block">
      <Card className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col border-0 h-full p-0">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            width={400}
            height={400}
          />
        </div>
        <CardHeader className="p-4 flex flex-col flex-1 gap-0">
          <CardTitle className="text-lg font-semibold text-black mb-2">
            {product.name}
          </CardTitle>
          <CardContent className="p-0 mt-auto">
            <p className="text-xl text-blue-600 font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
}

