"use client";

import { HoverEffect } from "@/app/_components/ui/card-hover-effect";
import { type Product } from "@/types";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div>
      {products.length > 0 ? (
        <HoverEffect products={products} />
      ) : (
        <div className={`flex min-h-[80vh] items-center justify-center`}>
          <p className={`mx-4 text-center text-muted-foreground`}>
            Uh oh! We {"couldn't"} find any products matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
