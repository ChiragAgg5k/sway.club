import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/legacy/image";
import { type Product } from "@/types";

export const HoverEffect = ({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {products.map((item, idx) => (
        <Link
          href={"/product/" + item?.sku_code}
          key={item?.sku_code}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-xl bg-lime-500/50 blur-lg"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.5,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className={`group relative block h-full w-full`}>
            <div className={`relative h-72 w-full`}>
              <Image
                alt={item.product_name}
                src={
                  item.images.length > 0 ? item.images[0]! : "/logo_with_bg.jpg"
                }
                layout="fill"
                className={`object-cover opacity-90`}
              />
              <Image
                src={item.images.length > 1 ? item.images[1]! : item.images[0]!}
                layout="fill"
                alt={item.product_name}
                className={`object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100`}
              />
            </div>
            <p className={`mt-4 text-sm`}>
              {item.product_name} |{" "}
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)} |
              Sway Clothing
            </p>
            <p className={`mt-2 text-sm text-gray-500`}>
              <span className={`font-semibold`}>Price: </span>{" "}
              <span className={`line-through`}>&#8377;{item.price}</span>{" "}
              <span className={`text-lime-500`}>
                &#8377;
                {item.price - (item.price * item.discount) / 100}
              </span>
            </p>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full overflow-hidden rounded-xl bg-background p-4 transition-all duration-300 ease-in-out group-hover:border-lime-500/70",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
