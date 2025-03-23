<script lang="ts">
	import { onMount } from 'svelte';
	import { trpc } from '$lib/trpc';
	import type { User } from '@prisma/client';

	export let reload = false;

	let users: User[] = [];
	let isLoading = true;
	let error = '';

	async function loadUsers() {
		isLoading = true;
		error = '';

		try {
			users = await trpc.users.getAll.query();
		} catch (err) {
			console.error('Error loading users:', err);
			error = 'Failed to load users. Please try again later.';
		} finally {
			isLoading = false;
		}
	}

	onMount(loadUsers);

	// Watch for reload changes to refresh the table
	$: if (reload) {
		loadUsers();
	}
</script>

<div class="user-table">
	<h2>Users</h2>

	{#if isLoading}
		<div class="loading">Loading users...</div>
	{:else if error}
		<div class="error">{error}</div>
	{:else if users.length === 0}
		<div class="empty">No users found. Add a new user to get started.</div>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Created At</th>
				</tr>
			</thead>
			<tbody>
				{#each users as user (user.id)}
					<tr>
						<td>{user.name}</td>
						<td>{user.email}</td>
						<td>{new Date(user.createdAt).toLocaleString()}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}

	<button class="refresh-button" on:click={loadUsers} disabled={isLoading}>
		{isLoading ? 'Refreshing...' : 'Refresh'}
	</button>
</div>

<style>
	.user-table {
		background: white;
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	h2 {
		margin-top: 0;
		margin-bottom: 1.5rem;
		color: #333;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 1rem;
	}

	th,
	td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid #eee;
	}

	th {
		font-weight: 600;
		color: #555;
		background: #f9f9f9;
	}

	tr:hover {
		background-color: #f9f9f9;
	}

	.loading,
	.error,
	.empty {
		padding: 2rem;
		text-align: center;
		color: #666;
	}

	.error {
		color: #d32f2f;
		background: #ffebee;
		border-radius: 4px;
	}

	.refresh-button {
		background: #4a90e2;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.refresh-button:hover {
		background: #3a80d2;
	}

	.refresh-button:disabled {
		background: #a0c0e8;
		cursor: not-allowed;
	}
</style>
