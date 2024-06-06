import { z } from "zod";

const sizeSchema = z.object({
  size: z.string().min(1),
  quantity: z.number().min(1),
});

export const productSchema = z.object({
  product_name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  color: z.string().min(1),
  style: z.string().min(1),
  price: z.number().min(1),
  discount: z.number().min(0).max(100),
  inventory_quantity: z.array(sizeSchema),
  images: z.array(z.string().min(1)),
  sku_code: z.string().min(1),
});

export type Product = z.infer<typeof productSchema>;
