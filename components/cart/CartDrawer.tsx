"use client";

import Image from "next/image";

import { useShoppingCart } from "../../app/context/ShoppingCartContext";
import { ShoppingBag, X, Minus, Plus } from "lucide-react";

export default function CartDrawer() {

  const { state, dispatch, isOpen, close } = useShoppingCart();
  
  const cartItems = state.items.map(i => ({
    product: { id: i.product.id, name: i.product.name, price: i.product.price, image: i.product.images[0] },
    size: i.size,
    quantity: i.quantity,
  }));

  const onUpdateQuantity = (productId: string, size: ProductSize | undefined, delta: number) => {
    const existing = state.items.find(i => i.product.id === productId && i.size === size);
    if (!existing) return;
    const newQuantity = existing.quantity + delta;
    if (newQuantity <= 0) {
      dispatch({ type: 'remove', productId, size });
    } else {
      dispatch({ type: 'updateQuantity', productId, size, quantity: newQuantity });
    }
  }

  // const onAddToCart = (item: Product, size: ProductSize) => {
  //   dispatch({ type: 'add', item: { product: item, size, quantity: 1 } });
  // };

  const subtotal = state.items.reduce((s, it) => s + it.product.price * it.quantity, 0);

  // const suggestedItems = state.items.map(i => i.product.relatedProducts).flat().filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={close}
      />

      <div className="fixed inset-y-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-slide-right">
        <div className="flex items-center justify-between p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <ShoppingBag className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            <h2 className="text-4xl dark:text-white">Shopping Cart</h2>
          </div>
          <button
            onClick={close}
            className="p-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors active:scale-95"
          >
            <X className="w-8 h-8 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {cartItems.length > 0 ? (
            <div className="mb-8">
              <h3 className="text-3xl mb-6 dark:text-white">Your Items ({cartItems.length})</h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 bg-gray-50 dark:bg-gray-700 rounded-2xl p-4"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-xl"
                      width={200}
                      height={200}
                    />
                    <div className="flex-1">
                      <h4 className="text-xl dark:text-white">{item.product.name}</h4>
                      <p className="text-lg text-gray-600 dark:text-gray-300">Size: {item.size}</p>
                      <p className="text-2xl text-blue-600 dark:text-blue-400">${item.product.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                        className="p-3 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 active:scale-95"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-2xl w-12 text-center dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                        className="p-3 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 active:scale-95"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-2xl text-gray-500 dark:text-gray-400">Your cart is empty</p>
            </div>
          )}

          {/* Todo: Update this with related products when an item is added */}
          {/* {suggestedItems.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-3xl dark:text-white">Customers Also Bought</h3>
                  <span className="px-4 py-2 bg-green-500 text-white rounded-full text-xl">10% OFF</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {suggestedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg"
                    >
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-xl mb-2 dark:text-white">{item.name}</h4>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xl text-gray-400 line-through">${item.price.toFixed(2)}</span>
                          <span className="text-2xl text-green-600 dark:text-green-400">${discountedPrice(item.price).toFixed(2)}</span>
                        </div>
                        <button
                          onClick={() => onAddToCart(item, item.sizes[0])}
                          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          )} */}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl dark:text-white">Subtotal:</span>
              <span className="text-4xl text-blue-600 dark:text-blue-400">${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-3xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
