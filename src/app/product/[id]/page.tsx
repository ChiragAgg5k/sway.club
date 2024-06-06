import { api } from "@/trpc/server";

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

  return (
    <div className={`flex items-center justify-center`}>
      <p>{product ? JSON.stringify(product, null, 2) : `Product not found`}</p>
    </div>
  );
}
