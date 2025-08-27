'use client';

import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '../../../packages/api/src/index';
export const trpc = createTRPCReact<AppRouter>();
