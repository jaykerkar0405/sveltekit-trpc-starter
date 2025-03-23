<script lang="ts">
	import { trpc } from '$lib/trpc';

	let name = '';
	let email = '';
	let isSubmitting = false;
	let errorMessage = '';
	let successMessage = '';

	async function handleSubmit() {
		errorMessage = '';
		successMessage = '';
		isSubmitting = true;

		try {
			if (!name || !email) {
				throw new Error('Please fill out all fields');
			}

			await trpc.users.create.mutate({ name, email });

			// Reset form
			name = '';
			email = '';
			successMessage = 'User created successfully!';

			// Notify parent component that a user was added
			dispatch('userAdded');
		} catch (error) {
			console.error('Error creating user:', error);
			errorMessage =
				error instanceof Error ? error.message : 'An error occurred while creating the user';
		} finally {
			isSubmitting = false;
		}
	}

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div class="user-form">
	<h2>Add New User</h2>

	<form on:submit|preventDefault={handleSubmit}>
		<div class="form-group">
			<label for="name">Name</label>
			<input
				type="text"
				id="name"
				bind:value={name}
				placeholder="Enter name"
				disabled={isSubmitting}
				required
			/>
		</div>

		<div class="form-group">
			<label for="email">Email</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				placeholder="Enter email"
				disabled={isSubmitting}
				required
			/>
		</div>

		<button type="submit" disabled={isSubmitting}>
			{isSubmitting ? 'Saving...' : 'Add User'}
		</button>

		{#if errorMessage}
			<div class="error-message">
				{errorMessage}
			</div>
		{/if}

		{#if successMessage}
			<div class="success-message">
				{successMessage}
			</div>
		{/if}
	</form>
</div>

<style>
	.user-form {
		background: #f9f9f9;
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
	}

	h2 {
		margin-top: 0;
		margin-bottom: 1.5rem;
		color: #333;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
	}

	input:focus {
		outline: none;
		border-color: #ff3e00;
		box-shadow: 0 0 0 2px rgba(255, 62, 0, 0.1);
	}

	button {
		background: #ff3e00;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
		margin-top: 0.5rem;
		width: 100%;
	}

	button:hover {
		background: #ff6340;
	}

	button:disabled {
		background: #ffaa91;
		cursor: not-allowed;
	}

	.error-message {
		color: #d32f2f;
		margin-top: 1rem;
		padding: 0.5rem;
		background: #ffebee;
		border-radius: 4px;
	}

	.success-message {
		color: #2e7d32;
		margin-top: 1rem;
		padding: 0.5rem;
		background: #e8f5e9;
		border-radius: 4px;
	}
</style>
