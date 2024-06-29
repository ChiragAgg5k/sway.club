"use client";

import { useCartStore } from "@/store/cart";
import CartCard from "@/app/_components/cart-card";

export default function CartPage() {
  const { cart } = useCartStore();

  return (
    <main className={`flex px-12 py-4`}>
      {cart.length > 0 ? (
        <div className={`w-full`}>
          <div className={`w-2/3`}>
            <h1 className={`mb-6 text-4xl font-bold`}>Your Cart</h1>
            <div>
              {cart.map((cartItem) => (
                <CartCard key={cartItem.sku_code} cartItem={cartItem} />
              ))}
            </div>
          </div>
          <div className={`w-1/3`}></div>
        </div>
      ) : (
        <div className={`flex min-h-[80vh] w-full items-center justify-center`}>
          <p className={`mx-4 text-center text-muted-foreground`}>
            Your cart is empty
          </p>
        </div>
      )}
    </main>
  );
}
