# SvelteKit with tRPC Template

This is a template project for creating SvelteKit applications with tRPC integration, providing a type-safe way to build API endpoints.

## Features

- Zod for input validation
- SvelteKit for the frontend
- SuperJSON for serialization
- tRPC for type-safe API endpoints
- TypeScript for better type safety

## Setup Instructions

### Step 1: Clone the Template

```bash
# Clone this repository
git clone https://github.com/jaykerkar0405/sveltekit-trpc-starter.git my-project

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

### Step 3: Start the Development Server

```bash
# Start development server
npm run dev
```

The application will be available at http://localhost:5173.

## Project Structure

- `src/lib/server/trpc/` - Contains all server-side tRPC code

  - `context.ts` - Defines the context passed to tRPC procedures
  - `trpc.ts` - Sets up the tRPC instance
  - `router.ts` - Defines the tRPC routes and procedures

- `src/lib/trpc/` - Contains client-side tRPC code

  - `client.ts` - Configures the tRPC client

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
      parameter: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    // Your procedure logic here
    return {
      result: `Processed: ${input.parameter}`,
    };
  });
```

3. Access it from the client:

```typescript
// In a Svelte component
import { trpc } from "$lib/trpc";

const result = await trpc.myNewProcedure.query({ parameter: "test" });
```

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

## Adding a Database

1. Install your preferred database client (e.g., Prisma, Drizzle)
2. Set up the database connection in `src/lib/server/trpc/context.ts`
3. Access the database client in your tRPC procedures through the context

## Additional Resources

- [Zod Documentation](https://zod.dev/)
- [tRPC Documentation](https://trpc.io/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
