"use client";

import { HoverEffect } from "@/app/_components/ui/card-hover-effect";
import { type Product } from "@/types";

export function NewArrivals({ products }: { products: Product[] }) {
  return (
    <div className="mx-auto max-w-6xl px-8">
      <HoverEffect products={products} />
    </div>
  );
}
