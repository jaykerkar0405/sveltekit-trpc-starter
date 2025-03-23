<script lang="ts">
	import { onMount } from 'svelte';
	import { trpc } from '$lib/trpc';
	import ExampleComponent from '../lib/components/ExampleComponent.svelte';

	let greeting = 'Loading...';
	let count = 0;

	onMount(async () => {
		try {
			const result = await trpc.greeting.query({ name: 'SvelteKit' });
			greeting = result.greeting;
		} catch (error) {
			console.error('Error fetching greeting:', error);
			greeting = 'Error loading greeting';
		}
	});

	async function incrementCounter() {
		try {
			const result = await trpc.counter.mutate({ count });
			count = result.newCount;
		} catch (error) {
			console.error('Error incrementing counter:', error);
		}
	}
</script>

<main>
	<h1>SvelteKit + tRPC Template</h1>

	<div>
		<h2>tRPC Query Example</h2>
		<p>{greeting}</p>
	</div>

	<div>
		<h2>tRPC Mutation Example</h2>
		<p>Count: {count}</p>
		<button on:click={incrementCounter}>Increment</button>
	</div>

	<ExampleComponent />
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		color: #ff3e00;
		text-align: center;
		margin-bottom: 2rem;
	}

	div {
		margin-bottom: 2rem;
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	button {
		background: #ff3e00;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background: #ff6340;
	}
</style>
