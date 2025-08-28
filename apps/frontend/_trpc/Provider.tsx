'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { TRPCProvider } from './client';

import type { AppRouter } from '../../../packages/api/src/index';
import superjson from 'superjson';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

function getBackendUrl() {
  const mode = process.env.EXPO_PUBLIC_BACKEND_MODE || 'localhost';
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_BACKEND_URL || 'http://192.168.68.111:3000/trpc';
  const ngrokUrl =
    process.env.EXPO_PUBLIC_NGROK_BACKEND_URL || 'https://f0443ce1b543.ngrok-free.app/trpc';

  const url = mode === 'ngrok' ? ngrokUrl : localUrl;
  console.log(`🔗 Backend Mode: ${mode}, URL: ${url}`);

  return url;
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getBackendUrl(),
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
