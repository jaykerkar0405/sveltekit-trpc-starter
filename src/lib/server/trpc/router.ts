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
		return {
			newCount: input.count + 1
		};
	}),

	// User procedures
	users: {
		getAll: publicProcedure.query(async ({ ctx }) => {
			return await ctx.prisma.user.findMany({
				orderBy: { createdAt: 'desc' }
			});
		}),

		create: publicProcedure
			.input(
				z.object({
					name: z.string().min(2, 'Name must be at least 2 characters'),
					email: z.string().email('Invalid email address')
				})
			)
			.mutation(async ({ ctx, input }) => {
				return await ctx.prisma.user.create({
					data: {
						name: input.name,
						email: input.email
					}
				});
			})
	}
});

export type AppRouter = typeof appRouter;
