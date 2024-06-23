"use client";

import { HoverEffect } from "@/app/_components/ui/card-hover-effect";
import { type Product } from "@/types";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="">
      <HoverEffect products={products} />
    </div>
  );
}
