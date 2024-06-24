import { api } from "@/trpc/server";
import Image from "next/legacy/image";
import { IoArrowForward } from "react-icons/io5";
import { Button } from "@/app/_components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";
import { Badge } from "@/app/_components/ui/badge";

const sizes = ["S", "M", "L", "XL"];

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
          <div className={`mt-6 flex items-center justify-start`}>
            <p className={`mr-4`}>Size: </p>
            <div className={`grid w-fit grid-cols-4 gap-4`}>
              {sizes.map((size, index) => (
                <Badge variant={`outline`} key={index}>
                  {size}
                </Badge>
              ))}
            </div>
          </div>
          <div className={`mt-6 flex items-center justify-start`}>
            <div className={`mr-4 grid grid-cols-3`}>
              <button
                className={`flex h-14 w-14 items-center justify-center border text-lg hover:scale-105 hover:text-lime-500`}
              >
                -
              </button>
              <div
                className={`flex h-14 w-14 items-center justify-center border`}
              >
                1
              </div>
              <button
                className={`flex h-14 w-14 items-center justify-center border text-lg hover:scale-105 hover:text-lime-500`}
              >
                +
              </button>
            </div>
            <Button
              className={
                "group flex w-48 items-center justify-center rounded-xl bg-lime-400 px-5 py-6 font-semibold text-black transition-colors ease-in-out hover:bg-lime-500"
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
      </div>
      <div>
        <h2 className={`mt-8 text-center text-2xl font-semibold`}>
          Related Products
        </h2>
      </div>
    </main>
  );
}
