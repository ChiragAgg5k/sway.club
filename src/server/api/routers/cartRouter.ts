import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import * as z from "zod";

export const cartRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        cart_items: z.array(
          z.object({
            product_sku_code: z.string(),
            quantity: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const cart = await ctx.db.cart.create({
        data: {
          user_id: input.user_id,
          cart_items: {
            createMany: {
              data: input.cart_items.map((cart_item) => ({
                product_sku_code: cart_item.product_sku_code,
                quantity: cart_item.quantity,
              })),
            },
          },
        },
        include: {
          cart_items: true,
        },
      });
      return cart;
    }),

  add: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        product_sku_code: z.string(),
        quantity: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const cart = await ctx.db.cart.create({
        data: {
          user_id: input.user_id,
          cart_items: {
            create: {
              product_sku_code: input.product_sku_code,
              quantity: input.quantity,
            },
          },
        },
        include: {
          cart_items: true,
        },
      });
      return cart;
    }),

  fetch: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const cart = await ctx.db.cart.findMany({
        where: {
          user_id: input.user_id,
        },
        include: {
          cart_items: true,
        },
      });
      return cart;
    }),
});
