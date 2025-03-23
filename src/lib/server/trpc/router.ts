import { z } from 'zod';
import { router, publicProcedure } from './trpc';

export const appRouter = router({
	greeting: publicProcedure
		.input(
			z.object({
				name: z.string().optional()
			})
		)
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.name ?? 'world'}!`,
				timestamp: new Date()
			};
		}),

	counter: publicProcedure.input(z.object({ count: z.number() })).mutation(async ({ input }) => {
		// This is where you could interact with a database
		return {
			newCount: input.count + 1
		};
	})
});

export type AppRouter = typeof appRouter;
