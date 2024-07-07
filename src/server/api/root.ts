import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { productRouter } from "@/server/api/routers/productRouter";
import { razorPayRouter } from "@/server/api/routers/razorPayRouter";
import { orderRouter } from "@/server/api/routers/orderRouter";
import { cartRouter } from "@/server/api/routers/cartRouter";

export const appRouter = createTRPCRouter({
  product: productRouter,
  razorPay: razorPayRouter,
  order: orderRouter,
  cart: cartRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
