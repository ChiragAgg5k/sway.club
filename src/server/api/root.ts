import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { productRouter } from "@/server/api/routers/productRouter";
import { razorPayRouter } from "@/server/api/routers/razorPayRouter";
import { orderRouter } from "@/server/api/routers/orderRouter";

export const appRouter = createTRPCRouter({
  product: productRouter,
  razorPay: razorPayRouter,
  order: orderRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
