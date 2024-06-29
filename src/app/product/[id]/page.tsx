import { api } from "@/trpc/server";
import Image from "next/legacy/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";
import ProductClient from "@/app/product/[id]/client";
import { ProductGrid } from "@/app/_components/product-grid";
import type { Product } from "@/types";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const product = (await api.product.fetchProduct({
    sku_code: params.id,
  })) as Product;

  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
      </div>
    );
  }

  const relatedProducts = (await api.product.fetchRelatedProducts({
    color: product.color,
  })) as Product[];

  return (
    <main>
      <div
        className={`flex min-h-[86vh] flex-col items-center justify-center md:flex-row`}
      >
        <div
          className={`mt-8 flex w-full items-center justify-center md:w-[40%]`}
        >
          <Carousel className={`w-[70%]`}>
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem
                  className={`flex items-center justify-center`}
                  key={index}
                >
                  <Image
                    src={
                      image || "https://via.placeholder.com/400?text=No+Image"
                    }
                    alt={product.product_name}
                    width={400}
                    height={500}
                    placeholder={"blur"}
                    blurDataURL={
                      "data:image/svg+xml;base64,Ly9zdGF0aWMub3JnLw=="
                    }
                    className={`h-full w-full`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className={`flex w-full flex-col p-8 md:w-[60%]`}>
          <h1 className={`mt-8 text-3xl font-semibold`}>
            {product.product_name} | {product.category} | Sway Clothing
          </h1>
          <p className={`mt-2 text-lg text-gray-500`}>
            <span className={`font-semibold`}>Price: </span>
            <span className={`line-through`}>&#8377;{product.price}</span>{" "}
            <span className={`text-lime-500`}>
              &#8377;
              {product.price - (product.price * product.discount) / 100}
            </span>
          </p>
          <p className={`mt-4 text-sm leading-7 text-muted-foreground`}>
            {product.description}
          </p>
          <ProductClient product={product} />
        </div>
      </div>
      <div>
        <h2 className={`mt-8 text-center text-2xl font-semibold`}>
          Related Products
        </h2>
        {relatedProducts ? (
          <div className={`mx-8 mb-12`}>
            <ProductGrid products={relatedProducts} />
          </div>
        ) : (
          <div className={`flex h-96 items-center justify-center`}>
            <p className={`text-center text-muted-foreground`}>
              No related products found. Please head back to the{" "}
              <Link
                href={`/collections`}
                className={`text-lime-500 hover:underline`}
              >
                Collections Page
              </Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
