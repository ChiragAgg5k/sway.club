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

export default async function CollectionsPage() {
  const products = (await api.product.fetchAllProducts()) as Product[];

  return (
    <div className={`flex flex-col p-4 md:flex-row`}>
      <div className={`mb-8 w-full px-4 md:w-1/3 md:px-0`}>
        <div className={`relative`}>
          <Input placeholder={`Search your wear`} />
          <FaMagnifyingGlass
            className={`absolute right-4 top-1/2 -translate-y-1/2 transform text-muted-foreground`}
          />
        </div>
        <p className={`mt-6 text-sm text-muted-foreground`}>
          Filter by price range:
        </p>
        <Slider className={`mt-3`} />
        <div className={`mt-6 flex items-center justify-between`}>
          <Button size={`sm`}>Apply Filter</Button>
          <p className={`text-sm text-muted-foreground`}>
            Price: <span>₹690 - ₹700</span>
          </p>
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
