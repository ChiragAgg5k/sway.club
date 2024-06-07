import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import * as z from "zod";

export const productRouter = createTRPCRouter({
  addProduct: publicProcedure
    .input(
      z.object({
        product_name: z.string(),
        description: z.string(),
        category: z.string(),
        color: z.string(),
        style: z.string(),
        price: z.number(),
        discount: z.number(),
        inventory_quantity: z.array(
          z.object({ size: z.string(), quantity: z.number() }),
        ),
        images: z.array(z.string()),
        sku_code: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.product.create({
        data: {
          product_name: input.product_name,
          description: input.description,
          category: input.category,
          color: input.color,
          style: input.style,
          price: input.price,
          discount: input.discount,
          inventory_quantity: {
            create: input.inventory_quantity,
          },
          images: {
            set: input.images,
          },
          sku_code: input.sku_code,
        },
      });
    }),

  fetchProduct: publicProcedure
    .input(
      z.object({
        sku_code: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.product.findUnique({
        where: {
          sku_code: input.sku_code,
        },
      });
    }),

  fetchLatestProducts: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        inventory_quantity: true,
      },
    });
  }),
});
