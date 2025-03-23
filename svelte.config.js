import adapter from '@sveltejs/adapter-auto';
/** @type {import('@sveltejs/kit').Config} */
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter()
	}
};

export default config;
