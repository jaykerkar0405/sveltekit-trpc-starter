<script lang="ts">
	let isVisible = true;

	function toggleVisibility() {
		isVisible = !isVisible;
	}
</script>

<div class="example-component">
	<h2>Example Component</h2>

	<button on:click={toggleVisibility}>
		{isVisible ? 'Hide' : 'Show'} Content
	</button>

	{#if isVisible}
		<div class="content">
			<p>This is an example Svelte component that can be reused throughout your application.</p>
		</div>
	{/if}
</div>

<style>
	.example-component {
		margin-top: 2rem;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.content {
		margin-top: 1rem;
		padding: 1rem;
		background: #f9f9f9;
		border-radius: 4px;
	}

	button {
		background: #4a90e2;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background: #3a80d2;
	}
</style>
