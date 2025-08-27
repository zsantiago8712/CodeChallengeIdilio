import { initTRPC } from "@trpc/server";
import superjson from "superjson";

// Importa el tipo Context desde el backend
import type { Context } from "../../../apps/backend/src/context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;

export const publicProcedure = t.procedure;
