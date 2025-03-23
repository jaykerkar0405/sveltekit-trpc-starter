import superjson from 'superjson';
import { browser } from '$app/environment';
import type { AppRouter } from '$lib/server/trpc/router';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

export const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			transformer: superjson,
			url: browser ? '/api/trpc' : 'http://localhost:5173/api/trpc'
		})
	]
});
