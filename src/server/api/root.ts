import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { productRouter } from "@/server/api/routers/productRouter";

export const appRouter = createTRPCRouter({
  product: productRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
