import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";

import { appRouter, AppRouter } from "../../../packages/api/src/index";

import fastify from "fastify";
import { createContext } from "./context";
import cors from "@fastify/cors";

const server = fastify({
  maxParamLength: 5000,
});

// Register CORS plugin
server.register(cors, {
  origin: true, // Allow all origins in development
  credentials: true,
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",

  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      // report to error monitoring
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});

(async () => {
  try {
    console.log("Starting server setup...");
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🚀 Server listening on http://0.0.0.0:3000");
  } catch (err) {
    console.error("Failed to start server:", err);
    server.log.error(err);
    process.exit(1);
  }
})();
