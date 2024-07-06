"use client";

import { useCartStore } from "@/store/cart";
import CartCard from "@/app/_components/cart-card";
import { IoIosCart } from "react-icons/io";
import { Button } from "../_components/ui/button";
import Link from "next/link";
import Script from "next/script";
import { api } from "@/trpc/react";
import React from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { env } from "@/env";
import { useToast } from "@/app/_components/ui/use-toast";
import { ToastAction } from "@/app/_components/ui/toast";
import { redirect } from "next/navigation";

export default function CartPage() {
  const { cart } = useCartStore();
  const createOrder = api.razorPay.createOrder.useMutation();
  const { user } = useUser();
  const { isSignedIn } = useUser();
  const { toast } = useToast();
  const order = api.order.create.useMutation();

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to proceed to payment",
        action: (
          <ToastAction altText={"Sign in"}>
            <SignInButton mode={`modal`}>Sign in</SignInButton>
          </ToastAction>
        ),
      });
      return;
    }

    const amount =
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100;
    const currency = "INR";
    try {
      const orderId = await createOrder.mutateAsync({
        amount: amount,
        currency: currency,
      });

      order.mutate({
        status: "pending",
        id: orderId.id,
        order_items: cart.map((item) => ({
          sku_code: item.sku_code,
          quantity: item.quantity,
        })),
        order_date: new Date().toISOString(),
        total_price: cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        ),
        user_id: user!.id,
      });

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
          contact: user?.phoneNumbers[0],
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
        redirect("/");
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      paymentObject.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={`flex px-4 py-4 md:px-6 lg:px-8 xl:px-12`}>
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
          </div>
          <div className={`mt-8 w-full pl-4 md:mt-0 md:w-1/3`}>
            <form
              onSubmit={processPayment}
              className={`relative flex min-h-[50dvh] w-full flex-col items-center justify-between rounded border p-4`}
            >
              <div className={`w-full flex-1`}>
                <h2 className={`text-xl font-semibold text-foreground`}>
                  Order Summary:{" "}
                </h2>
                <div className={`mt-2 h-1 w-full bg-border`} />
                {cart.map((cartItem) => (
                  <div
                    key={cartItem.sku_code}
                    className={`mt-2 flex items-center justify-between`}
                  >
                    <p className={`text-sm`}>
                      - {cartItem.product_name}{" "}
                      <span className={`ml-4 text-muted-foreground`}>
                        x {cartItem.quantity}
                      </span>
                    </p>
                    <p className={`text-muted-foreground`}>
                      &#8377;{cartItem.price * cartItem.quantity}
                    </p>
                  </div>
                ))}
              </div>
              <p
                className={`mb-1 mt-4 w-full pr-4 text-right text-lg text-muted-foreground`}
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
              <div className={`mb-4 h-1 w-full bg-border`} />
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
