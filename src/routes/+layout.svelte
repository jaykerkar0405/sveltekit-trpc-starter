<nav>
	<div class="container">
		<a href="/" class="logo">SvelteKit + tRPC</a>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/users">Users</a></li>
		</ul>
	</div>
</nav>

<slot />

<style>
	nav {
		background: #333;
		color: white;
		padding: 1rem 0;
		margin-bottom: 2rem;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-size: 1.25rem;
		font-weight: bold;
		color: white;
		text-decoration: none;
	}

	ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		margin-left: 1.5rem;
	}

	a {
		color: white;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
