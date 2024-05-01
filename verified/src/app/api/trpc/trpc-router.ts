import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const appRouter = t.router({
  sayHello: t.procedure.query(() => {
    return "Hello world!";
  }),
});

export type AppRouter = typeof appRouter;
