import type { RequestEvent } from '@sveltejs/kit';

export async function createContext(event: RequestEvent) {
	return {
		event
		// Add your session, database, etc. here
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
