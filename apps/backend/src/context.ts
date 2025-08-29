import { prisma } from './db/prisma';
import { PrismaClient } from '@prisma/client';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export function createContext({ req, res }: CreateFastifyContextOptions) {
    const user = { name: req.headers.username ?? 'anonymous' };
    return { prisma: prisma as PrismaClient, req, res, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
