import { PrismaClient } from '@prisma/client';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { prisma } from './db/prisma';

export function createContext({ req, res }: CreateFastifyContextOptions) {
    const user = { name: req.headers.username ?? 'anonymous' };
    const user_id = '7d7b2d76-224f-4119-969a-c1cec79d8a4f';
    return { prisma: prisma as PrismaClient, req, res, user, user_id };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
