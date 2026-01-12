import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  return (
    // Checkout page not implemented yet
    <Link href="/">
      <Button
        variant="ghost"
        className="text-gray-700 hover:text-gray-900 hover:bg-transparent p-0 h-auto font-normal"
      >
        <ShoppingCart className="h-5 w-5 mr-1"/>
        <span>Cart</span>
      </Button>
    </Link>
  )
}

