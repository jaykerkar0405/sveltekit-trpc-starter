<script lang="ts">
	import UserForm from '$lib/components/UserForm.svelte';
	import UserTable from '$lib/components/UserTable.svelte';

	let shouldReloadTable = false;

	function handleUserAdded() {
		// Toggle the reload flag to trigger the table refresh
		shouldReloadTable = !shouldReloadTable;
	}
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<main>
	<h1>User Management</h1>

	<UserForm on:userAdded={handleUserAdded} />

	<UserTable reload={shouldReloadTable} />
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
</style>
