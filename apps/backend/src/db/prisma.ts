import { PrismaClient } from "@prisma/client";

declare global {
  // Permite que la variable prisma sea global en el entorno de desarrollo
  var __basePrisma: PrismaClient | undefined;
}

const basePrisma =
  global.__basePrisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV === "development") {
  global.__basePrisma = basePrisma;
}

export const prisma = basePrisma;
