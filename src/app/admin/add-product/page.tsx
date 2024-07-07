"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { type Product } from "@/types";
import { Label } from "@/app/_components/ui/label";
import React, { useState } from "react";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/app/_components/ui/select";
import { IoIosCloseCircle } from "react-icons/io";
import { api } from "@/trpc/react";
import Image from "next/legacy/image";
import { useToast } from "@/app/_components/ui/use-toast";

const sizes = [
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "XXL" },
];

export default function AddProductPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const productRouter = api.product.addProduct.useMutation({
    onSuccess: () => {
      toast({
        title: "Product added successfully",
        description: "Product has been added successfully",
      });
      setProduct({
        product_name: "",
        description: "",
        category: "",
        color: "",
        style: "",
        price: 0,
        discount: 0,
        inventory_quantity: [
          { size: "s", quantity: 0 },
          { size: "m", quantity: 0 },
          { size: "l", quantity: 0 },
          { size: "xl", quantity: 0 },
          { size: "xxl", quantity: 0 },
        ],
        images: [],
        sku_code: "",
      });
      setImage("");
    },
  });

  const [product, setProduct] = useState<Product>({
    product_name: "",
    description: "",
    category: "",
    color: "",
    style: "",
    price: 0,
    discount: 0,
    inventory_quantity: [
      { size: "s", quantity: 0 },
      { size: "m", quantity: 0 },
      { size: "l", quantity: 0 },
      { size: "xl", quantity: 0 },
      { size: "xxl", quantity: 0 },
    ],
    images: [],
    sku_code: "",
  });

  const handleSubmit = async () => {
    if (
      product.images.length === 0 ||
      product.product_name === "" ||
      product.description === "" ||
      product.category === "" ||
      product.color === "" ||
      product.style === "" ||
      product.price === 0 ||
      product.discount === 0 ||
      product.sku_code === ""
    ) {
      return;
    }
    setLoading(true);
    await productRouter.mutateAsync(product);
    setLoading(false);
  };

  const [image, setImage] = useState<string>("");

  return (
    <div className={`flex min-h-[90vh] flex-col items-center justify-center`}>
      <div className="my-8 w-full max-w-xl space-y-6 rounded-lg border p-8 shadow-md">
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="product_name">Product name</Label>
          <Input
            type="text"
            id="product_name"
            placeholder="Enter product name"
            onChange={(e) => {
              setProduct({
                ...product,
                product_name: e.target.value,
              });
            }}
          />
        </div>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            onChange={(e) => {
              setProduct({
                ...product,
                description: e.target.value,
              });
            }}
            id="description"
            placeholder="Enter description"
          />
        </div>

        <div className={`grid w-full grid-cols-3 items-center gap-4`}>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) => {
                setProduct({
                  ...product,
                  category: value,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Oversized T-Shirt">
                    Oversized T-Shirt
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="color">Color</Label>
            <Select
              onValueChange={(value) => {
                setProduct({
                  ...product,
                  color: value,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="style">Style</Label>
            <Select
              onValueChange={(value) => {
                setProduct({
                  ...product,
                  style: value,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="printed">Printed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="product_name">Quantity</Label>
          {
            <div className={`grid w-full grid-cols-2 items-center gap-4`}>
              {sizes.map((size) => (
                <div
                  key={size.value}
                  className={`flex w-full items-center gap-3`}
                >
                  <Label htmlFor={size.value}>{size.label}</Label>
                  <Input
                    type="text"
                    id={size.value}
                    placeholder="Enter quantity"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        inventory_quantity: product.inventory_quantity.map(
                          (inventory) => {
                            if (inventory.size === size.value) {
                              return {
                                ...inventory,
                                quantity: parseInt(e.target.value),
                              };
                            }
                            return inventory;
                          },
                        ),
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          }
        </div>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="images">Images</Label>
          <div className={`relative`}>
            <Input
              onChange={(e) => {
                setImage(e.target.value);
              }}
              value={image}
              type="text"
              id="images"
              placeholder="Enter image url"
            />
            <Button
              onClick={() => {
                setProduct({
                  ...product,
                  images: [...product.images, image],
                });
                setImage("");
              }}
              className={`absolute right-0 top-0 mr-1 mt-1 h-[80%]`}
            >
              Add Image
            </Button>
          </div>
          <div
            className={
              "grid w-full grid-cols-5 place-items-center gap-3 overflow-y-auto"
            }
          >
            {product.images.map((image, index) => (
              <div key={index} className={`relative`}>
                <Image
                  src={image}
                  alt="product image"
                  className={`h-20 w-20`}
                  width={80}
                  height={80}
                  placeholder={"blur"}
                  blurDataURL={"data:image/svg+xml;base64,Ly9zdGF0aWMub3JnLw=="}
                />
                <button
                  className={"absolute right-1 top-1"}
                  onClick={() => {
                    setProduct({
                      ...product,
                      images: product.images.filter((img) => img !== image),
                    });
                  }}
                >
                  <IoIosCloseCircle className={`text-xl text-secondary`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={`grid w-full grid-cols-2 items-center gap-4`}>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              type="text"
              id="price"
              placeholder="Enter price"
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: parseInt(e.target.value),
                });
              }}
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="discount">Discount</Label>
            <Input
              type="text"
              id="discount"
              placeholder="Enter discount"
              onChange={(e) => {
                setProduct({
                  ...product,
                  discount: parseInt(e.target.value),
                });
              }}
            />
          </div>
        </div>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="sku_code">SKU Code</Label>
          <Input
            type="text"
            id="sku_code"
            placeholder="Enter SKU code"
            onChange={(e) => {
              setProduct({
                ...product,
                sku_code: e.target.value,
              });
            }}
          />
        </div>

        <Button
          disabled={loading}
          type="submit"
          className={`w-full`}
          onClick={handleSubmit}
        >
          {loading ? "Adding product..." : "Add Product"}
        </Button>
      </div>
    </div>
  );
}
