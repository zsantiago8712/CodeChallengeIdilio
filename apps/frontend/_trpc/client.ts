'use client';

import type { AppRouter } from '../../../packages/api/src/index';

import { createTRPCContext } from '@trpc/tanstack-react-query';

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>();
