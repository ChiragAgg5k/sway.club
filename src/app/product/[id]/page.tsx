import { api } from "@/trpc/server";
import Image from "next/legacy/image";

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
    <div className={`flex min-h-[85vh] items-center justify-center`}>
      <div className={`flex w-full items-center justify-center`}>
        <Image
          src={
            product.images[0] ?? "https://via.placeholder.com/400?text=No+Image"
          }
          alt={product.product_name}
          width={400}
          height={500}
          className={`h-full w-full`}
        />
      </div>
      <div className={`w-full`}>
        <h1>
          {product.product_name} | {product.category} | Sway Clothing
        </h1>
      </div>
    </div>
  );
}
