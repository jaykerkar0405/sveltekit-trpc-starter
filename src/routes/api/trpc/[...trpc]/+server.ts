import type { RequestHandler } from './$types';
import { appRouter } from '$lib/server/trpc/router';
import { createContext } from '$lib/server/trpc/context';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export const GET: RequestHandler = async (event) => {
	return fetchRequestHandler({
		router: appRouter,
		req: event.request,
		endpoint: '/api/trpc',
		createContext: () => createContext(event)
	});
};

export const POST: RequestHandler = async (event) => {
	return fetchRequestHandler({
		router: appRouter,
		req: event.request,
		endpoint: '/api/trpc',
		createContext: () => createContext(event)
	});
};
