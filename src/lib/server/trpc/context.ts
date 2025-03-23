import { prisma } from '../prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function createContext(event: RequestEvent) {
	return {
		event,
		prisma
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
