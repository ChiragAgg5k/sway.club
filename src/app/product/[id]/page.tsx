import { api } from "@/trpc/server";
import Image from "next/legacy/image";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";

export default async function ProductPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const product = await api.product.fetchProduct({
    sku_code: params.id,
  });

  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-[85vh] flex-col items-center justify-center md:flex-row`}
    >
      <div className={`mt-8 flex w-full items-center justify-center`}>
        <Image
          src={
            product.images[0] ?? "https://via.placeholder.com/400?text=No+Image"
          }
          alt={product.product_name}
          width={400}
          height={500}
          placeholder={"blur"}
          blurDataURL={"data:image/svg+xml;base64,Ly9zdGF0aWMub3JnLw=="}
          className={`h-full w-full`}
        />
      </div>
      <div className={`flex w-full flex-col p-8`}>
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
        <p className={`text-md mt-4 text-muted-foreground`}>
          {product.description}
        </p>
        <Button
          className={
            "group mt-6 flex w-48 items-center justify-center rounded-xl bg-lime-400 px-5 py-6 font-semibold text-black transition-colors ease-in-out hover:bg-lime-500"
          }
        >
          Add to cart
          <div
            className={`ml-1 inline-block transform transition-transform ease-in-out group-hover:translate-x-1`}
          >
            <IoArrowForward />
          </div>
        </Button>
      </div>
    </div>
  );
}
