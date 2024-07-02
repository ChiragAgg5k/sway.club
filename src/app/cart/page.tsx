"use client";

import { useCartStore } from "@/store/cart";
import CartCard from "@/app/_components/cart-card";
import { IoIosCart } from "react-icons/io";
import { Button } from "../_components/ui/button";
import Link from "next/link";
import Script from "next/script";
import { api } from "@/trpc/react";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { env } from "@/env";

export default function CartPage() {
  const { cart } = useCartStore();
  const createOrder = api.razorPay.createOrder.useMutation();
  const { user } = useUser();

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount =
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100;
    const currency = "INR";
    try {
      const orderId = await createOrder.mutateAsync({
        amount: amount,
        currency: currency,
      });
      console.log(orderId);
      const options = {
        key: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "Sway Store",
        description: `Payment for your order - ${orderId.id}`,
        order_id: orderId,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          const res = (await result.json()) as {
            isOk: boolean;
            message: string;
          };
          if (res.isOk) alert("payment succeed");
          else {
            alert(res.message);
          }
        },
        prefill: {
          name: user?.fullName,
          email: user?.emailAddresses[0],
        },
        theme: {
          color: "#98d93a",
        },
      };

      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const paymentObject = new window.Razorpay(options);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      paymentObject.on("payment.failed", function (response: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        alert(response.error.description);
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      paymentObject.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={`flex px-12 py-4`}>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      {cart.length > 0 ? (
        <div className={`flex w-full flex-col md:flex-row`}>
          <div className={`w-full md:w-2/3`}>
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
          <div className={`w-full pl-4 md:w-1/3`}>
            <form
              onSubmit={processPayment}
              className={`relative flex min-h-[50dvh] flex-col items-center justify-between rounded border p-4`}
            >
              <h2 className={`text-xl font-semibold text-foreground`}>
                Order Summary:{" "}
              </h2>
              <Button
                type="submit"
                className={` w-full bg-lime-500 hover:bg-lime-600`}
              >
                Proceed to Payment
              </Button>
            </form>
          </div>
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
