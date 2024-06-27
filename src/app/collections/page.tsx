import { api } from "@/trpc/server";
import { ProductGrid } from "@/app/_components/product-grid";
import { type Product } from "@/types";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Slider } from "@/app/_components/ui/slider";
import { Button } from "@/app/_components/ui/button";
import CollectionsClient from "@/app/collections/client";

export default async function CollectionsPage() {
  const products = (await api.product.fetchAllProducts()) as Product[];

  return <CollectionsClient fetchedProducts={products} />;
}
