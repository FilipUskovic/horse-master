import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// VitePreprocess omogućuje Svelteu da razumije PostCSS/Tailwind u <style> tagovima
	preprocess: vitePreprocess(), 

	kit: {
		adapter: adapter(),
		alias: {
			"$lib": "./src/lib",
			"$lib/*": "./src/lib/*"
		}
	}
};

export default config;
