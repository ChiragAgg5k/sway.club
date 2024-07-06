"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { IoArrowForward } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useToast } from "@/app/_components/ui/use-toast";
import { useCartStore } from "@/store/cart";
import { type Product } from "@/types";
import { ToastAction } from "@/app/_components/ui/toast";
import { useRouter } from "next/navigation";

export default function ProductClient({ product }: { product: Product }) {
  const [sizes, setSizes] = useState<
    {
      size: string;
      selected: boolean;
    }[]
  >([
    { size: "S", selected: false },
    { size: "M", selected: false },
    { size: "L", selected: false },
    { size: "XL", selected: false },
    { size: "XXL", selected: false },
  ]);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { add, checkIfInCart } = useCartStore();
  const router = useRouter();
  const [currProductAdded, setCurrProductAdded] = useState(false);

  useEffect(() => {
    const selectedSize = sizes.find((size) => size.selected);
    setCurrProductAdded(
      checkIfInCart(
        product.sku_code,
        selectedSize?.size as "S" | "M" | "L" | "XL" | "XXL",
      ),
    );

    return () => {
      setCurrProductAdded(false);
    };
  }, [sizes]);

  const handleAddToCart = () => {
    const selectedSize = sizes.find((size) => size.selected);
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size to add to cart",
      });
      return;
    }
    add(product, quantity, selectedSize.size as "S" | "M" | "L" | "XL" | "XXL");
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.product_name} of size ${selectedSize.size} added to cart`,
      action: (
        <ToastAction
          onClick={() => {
            router.push("/cart");
          }}
          altText="Go to cart"
        >
          View Cart
        </ToastAction>
      ),
    });

    setCurrProductAdded(true);
  };

  return (
    <>
      <div className={`mt-6 flex items-center justify-start`}>
        <p className={`mr-4`}>Size: </p>
        <div className={`grid w-fit grid-cols-5 gap-4`}>
          {sizes.map((size, index) => (
            <Badge
              key={index}
              className={size.selected ? `cursor-default` : `cursor-pointer`}
              variant={size.selected ? "default" : "outline"}
              onClick={() => {
                setSizes(
                  sizes.map((s) =>
                    s.size === size.size
                      ? { ...s, selected: !s.selected }
                      : { ...s, selected: false },
                  ),
                );
              }}
            >
              {size.size}
            </Badge>
          ))}
        </div>
      </div>
      <div className={`mt-6 flex items-center justify-start`}>
        <div className={`mr-4 grid grid-cols-3`}>
          <button
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
            className={`flex h-14 w-14 items-center justify-center border text-lg hover:scale-105 hover:text-lime-500`}
          >
            -
          </button>
          <div className={`flex h-14 w-14 items-center justify-center border`}>
            {quantity}
          </div>
          <button
            onClick={() => {
              setQuantity(quantity + 1);
            }}
            className={`flex h-14 w-14 items-center justify-center border text-lg hover:scale-105 hover:text-lime-500`}
          >
            +
          </button>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={currProductAdded}
          className={
            currProductAdded
              ? "group flex w-48 items-center justify-center rounded-xl border bg-background px-5 py-6 font-semibold text-foreground hover:bg-background"
              : "group flex w-48 items-center justify-center rounded-xl bg-lime-400 px-5 py-6 font-semibold text-black transition-colors ease-in-out hover:bg-lime-500"
          }
        >
          {currProductAdded ? "Added to cart" : "Add to cart"}
          <div
            className={`ml-1 inline-block transform transition-transform ease-in-out group-hover:translate-x-1`}
          >
            {currProductAdded ? <FaCheck /> : <IoArrowForward />}
          </div>
        </Button>
      </div>
    </>
  );
}
