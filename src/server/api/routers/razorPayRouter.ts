import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import * as z from "zod";
import Razorpay from "razorpay";
import { env } from "@/env";

const razorpay = new Razorpay({
  key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export const razorPayRouter = createTRPCRouter({
  createOrder: publicProcedure
    .input(
      z.object({
        amount: z.number(),
        currency: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const order = await razorpay.orders.create(input);
      return order;
    }),
});
