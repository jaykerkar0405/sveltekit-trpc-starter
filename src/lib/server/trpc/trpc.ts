import superjson from 'superjson';
import { initTRPC } from '@trpc/server';
import type { Context } from './context';

const t = initTRPC.context<Context>().create({
	transformer: superjson
});

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
