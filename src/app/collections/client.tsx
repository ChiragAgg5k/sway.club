"use client";

import { Input } from "@/app/_components/ui/input";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Slider } from "@/app/_components/ui/slider";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { ProductGrid } from "@/app/_components/product-grid";
import { type Product } from "@/types";
import { useState } from "react";

export default function CollectionsClient({
  fetchedProducts,
}: {
  fetchedProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(fetchedProducts);
  const [priceRange, setPriceRange] = useState<[number, number]>([690, 700]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number]
  >([690, 700]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filterProducts = (products: Product[]) => {
    return products.filter((product) => {
      const discountedPrice =
        product.price - (product.price * product.discount) / 100;
      return (
        discountedPrice >= selectedPriceRange[0] &&
        discountedPrice <= selectedPriceRange[1] &&
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  return (
    <div className={`flex flex-col p-4 md:flex-row`}>
      <div className={`mb-8 w-full px-4 md:w-1/3 md:px-0`}>
        <div className={`relative`}>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search your wear`}
          />
          <FaMagnifyingGlass
            className={`absolute right-4 top-1/2 -translate-y-1/2 transform text-muted-foreground`}
          />
        </div>
        <p className={`mt-6 text-sm text-muted-foreground`}>
          Filter by price range:
        </p>
        <Slider
          min={0}
          max={1000}
          step={10}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          value={priceRange}
          className={`mt-3`}
        />
        <div className={`mt-6 flex items-center justify-between`}>
          <Button size={`sm`} onClick={() => setSelectedPriceRange(priceRange)}>
            Apply Filter
          </Button>
          <p className={`text-sm text-muted-foreground`}>
            Price:{" "}
            <span>
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </span>
          </p>
        </div>
      </div>
      <div className={`w-full`}>
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
        <ProductGrid products={filterProducts(products)} />
      </div>
    </div>
  );
}
