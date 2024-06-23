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

export default async function CollectionsPage() {
  const products = (await api.product.fetchAllProducts()) as Product[];

  return (
    <div className={`flex p-4`}>
      <div className={`w-1/3`}>
        <div className={`relative`}>
          <Input placeholder={`Search your wear`} />
          <FaMagnifyingGlass
            className={`absolute right-4 top-1/2 -translate-y-1/2 transform text-muted-foreground`}
          />
        </div>
      </div>
      <div>
        <div className={`flex items-center justify-between`}>
          <p className={`pl-8 pt-4 text-sm text-muted-foreground`}>
            Showing all products
          </p>
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Default Sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Sort by Price: Low to High</SelectItem>
              <SelectItem value="high">Sort by Price: High to Low</SelectItem>
              <SelectItem value="popularity">Sort by Popularity</SelectItem>
              <SelectItem value="rating">Sort by Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
