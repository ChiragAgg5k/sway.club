import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import * as z from "zod";

export const orderRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        id: z.string(),
        order_date: z.string(),
        total_price: z.number(),
        status: z.string(),
        user_id: z.string(),
        order_items: z.array(
          z.object({
            sku_code: z.string(),
            quantity: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.create({
        data: {
          id: input.id,
          order_date: new Date(input.order_date),
          total_price: input.total_price,
          status: input.status,
          user_id: input.user_id,
          order_items: {
            createMany: {
              data: input.order_items.map((order_item) => ({
                product_sku_code: order_item.sku_code,
                quantity: order_item.quantity,
              })),
            },
          },
        },
        include: {
          order_items: true,
        },
      });
      return order;
    }),
});
