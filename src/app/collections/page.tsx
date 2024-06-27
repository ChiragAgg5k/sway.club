import { api } from "@/trpc/server";
import { type Product } from "@/types";
import CollectionsClient from "@/app/collections/client";

export default async function CollectionsPage() {
  const products = (await api.product.fetchAllProducts()) as Product[];

  return <CollectionsClient fetchedProducts={products} />;
}
