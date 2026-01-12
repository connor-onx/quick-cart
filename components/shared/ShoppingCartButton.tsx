import { ShoppingCart } from "lucide-react";

export default function ShoppingCartButton() {
  //Todo: Integrate with app
   
  return (
    <button
      // onClick={() => setIsCartOpen(true)}
      className="p-6 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-gray-200 dark:border-gray-700"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-10 h-10 text-blue-600 dark:text-blue-400" />
      {/* {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      )} */}
    </button>
  )
}
