"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { IoArrowForward } from "react-icons/io5";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useToast } from "@/app/_components/ui/use-toast";
import { ToastAction } from "@/app/_components/ui/toast";

export default function ProductClient() {
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
  ]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    const selectedSize = sizes.find((size) => size.selected);
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size to add to cart",
      });
      return;
    }
    setAddedToCart(true);
  };

  return (
    <>
      <div className={`mt-6 flex items-center justify-start`}>
        <p className={`mr-4`}>Size: </p>
        <div className={`grid w-fit grid-cols-4 gap-4`}>
          {sizes.map((size, index) => (
            <Badge
              key={index}
              className={`cursor-pointer`}
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
          className={
            addedToCart
              ? "group flex w-48 items-center justify-center rounded-xl border bg-background px-5 py-6 font-semibold text-foreground hover:bg-background"
              : "group flex w-48 items-center justify-center rounded-xl bg-lime-400 px-5 py-6 font-semibold text-black transition-colors ease-in-out hover:bg-lime-500"
          }
        >
          Add to cart
          <div
            className={`ml-1 inline-block transform transition-transform ease-in-out group-hover:translate-x-1`}
          >
            {addedToCart ? <FaCheck /> : <IoArrowForward />}
          </div>
        </Button>
      </div>
    </>
  );
}
