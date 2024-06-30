"use client";

import { type CartItem, useCartStore } from "@/store/cart";
import Image from "next/legacy/image";
import React from "react";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

export default function CartCard({ cartItem }: { cartItem: CartItem }) {
  const { increaseCount, decreaseCount, remove } = useCartStore();

  return (
    <div className={`relative grid grid-cols-4 border p-4`}>
      <button
        onClick={() => remove(cartItem, cartItem.size)}
        className={`absolute right-2 top-2 cursor-pointer`}
      >
        <IoMdClose className={`text-muted-foreground`} />
      </button>
      <div className={`relative h-40 w-32`}>
        <Image
          layout={"fill"}
          src={
            cartItem.images[0] ??
            "https://via.placeholder.com/400?text=No+Image"
          }
          className={`rounded`}
          alt={cartItem.product_name}
        />
      </div>
      <div className={`flex flex-col items-start justify-center`}>
        <Link href={`/product/${cartItem.sku_code}`}>
          <h2 className={`text-lg font-bold`}>{cartItem.product_name}</h2>
        </Link>
        <p className={`text-sm text-muted-foreground`}>
          {cartItem.category} <br />{" "}
          {cartItem.style[0]!.toUpperCase() + cartItem.style.slice(1)} <br />
          Size: <span className={`text-lime-500`}>{cartItem.size}</span>
        </p>
      </div>
      <div className={`flex items-center justify-center`}>
        <div className={`mr-4 grid grid-cols-3`}>
          <button
            onClick={() => {
              if (cartItem.quantity > 1) {
                decreaseCount(cartItem, 1);
              }
            }}
            className={`flex h-10 w-10 items-center justify-center border text-lg hover:scale-105 hover:text-lime-500`}
          >
            -
          </button>
          <div className={`flex h-10 w-10 items-center justify-center border`}>
            {cartItem.quantity}
          </div>
          <button
            onClick={() => increaseCount(cartItem, 1)}
            className={`flex h-10 w-10 items-center justify-center border text-lg hover:scale-105 hover:text-lime-500`}
          >
            +
          </button>
        </div>
      </div>
      <div className={`flex items-center justify-center`}>
        <div className={`relative flex h-20 items-center justify-center`}>
          <p className={`mt-2 text-center text-xl text-lime-500`}>
            {cartItem.quantity} x &#8377;
            {cartItem.price - (cartItem.price * cartItem.discount) / 100}
          </p>
          <span
            className={`absolute bottom-0 text-sm text-muted-foreground line-through`}
          >
            &#8377;{cartItem.price}
          </span>
        </div>
      </div>
    </div>
  );
}
