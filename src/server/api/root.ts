import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { productRouter } from "@/server/api/routers/productRouter";
import { razorPayRouter } from "@/server/api/routers/razorPayRouter";

export const appRouter = createTRPCRouter({
  product: productRouter,
  razorPay: razorPayRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
