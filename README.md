# SvelteKit with tRPC and Prisma Template

This is a template project for creating SvelteKit applications with tRPC integration and Prisma for database access, providing a type-safe way to build full-stack applications.

## Features

- SvelteKit for the frontend
- tRPC for type-safe API endpoints
- Prisma ORM for database access
- TypeScript for better type safety
- Zod for input validation
- SuperJSON for serialization
- User management example (form and table)

## Setup Instructions

### Step 1: Clone the Template

```bash
# Clone this repository
git clone https://github.com/your-username/sveltekit-trpc-template.git my-project

# Navigate to project directory
cd my-project

# Remove the existing git history (optional)
rm -rf .git

# Initialize a new git repository (optional)
git init
```

### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install
```

### Step 3: Set Up the Database

```bash
# Generate the Prisma client
npx prisma generate

# Create the database and run migrations
npx prisma migrate dev --name init
```

### Step 4: Start the Development Server

```bash
# Start development server
npm run dev
```

The application will be available at http://localhost:5173.

## Database Management

- **Prisma Studio**: Run `npm run prisma:studio` to open a visual database browser
- **Generate Prisma Client**: Run `npm run prisma:generate` after schema changes
- **Create Migrations**: Run `npm run prisma:migrate:dev` to create new migrations
- **Reset Database**: Run `npm run prisma:migrate:reset` to reset the database

## Project Structure

- `prisma/` - Contains Prisma schema and migrations
- `src/lib/server/prisma.ts` - Exports the Prisma client instance
- `src/lib/server/trpc/` - Contains all server-side tRPC code
  - `context.ts` - Defines the context passed to tRPC procedures
  - `trpc.ts` - Sets up the tRPC instance
  - `router.ts` - Defines the tRPC routes and procedures
- `src/lib/trpc/` - Contains client-side tRPC code
  - `client.ts` - Configures the tRPC client
- `src/lib/components/` - Reusable UI components
- `src/routes/api/trpc/[...trpc]/+server.ts` - The SvelteKit endpoint that handles tRPC requests
- `src/routes/` - SvelteKit routes and pages

## Adding New tRPC Procedures

1. Open `src/lib/server/trpc/router.ts`
2. Add your new procedure within the router:

```typescript
myNewProcedure: publicProcedure
	.input(
		z.object({
			// Define your input schema here using Zod
			parameter: z.string()
		})
	)
	.query(async ({ input, ctx }) => {
		// Your procedure logic here
		// Access the database with ctx.prisma
		return {
			result: `Processed: ${input.parameter}`
		};
	});
```

3. Access it from the client:

```typescript
// In a Svelte component
import { trpc } from '$lib/trpc';

const result = await trpc.myNewProcedure.query({ parameter: 'test' });
```

## Adding New Database Models

1. Edit the `prisma/schema.prisma` file to add your new model
2. Run `npm run prisma:migrate:dev` to create a migration
3. Use the model in your tRPC procedures through the `ctx.prisma` client

## Deployment

Build the application for production:

```bash
npm run build
```

The build output will be in the `build` directory, which can be deployed to your preferred hosting service.

## Adding Authentication

To add authentication:

1. Implement authentication in the context function in `src/lib/server/trpc/context.ts`
2. Create protected procedures using middleware in `src/lib/server/trpc/trpc.ts`

## Additional Resources

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev/)
