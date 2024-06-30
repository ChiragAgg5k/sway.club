"use client";

import { useCartStore } from "@/store/cart";
import CartCard from "@/app/_components/cart-card";
import { IoIosCart } from "react-icons/io";
import { Button } from "../_components/ui/button";
import Link from "next/link";

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
            <p
              className={`mt-4 w-full pr-4 text-right text-lg text-muted-foreground`}
            >
              Total:{" "}
              <span className={`text-foreground`}>
                &#8377;
                {cart.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0,
                )}
              </span>
            </p>
          </div>
          <div className={`w-1/3`}></div>
        </div>
      ) : (
        <div
          className={`flex min-h-[80vh] w-full flex-col items-center justify-center`}
        >
          <IoIosCart className={`mb-2 text-8xl text-muted-foreground`} />
          <p className={`mx-4 text-center text-muted-foreground`}>
            Uh oh! Seems like your cart is empty.
          </p>
          <Link href={`/collections`}>
            <Button className={`mt-4`}>Start Shopping</Button>
          </Link>
        </div>
      )}
    </main>
  );
}
