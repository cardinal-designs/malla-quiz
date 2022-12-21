import adapter from '@sveltejs/adapter-static';
// import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';

const githubPagesUrl = 'https://cardinal-designs.github.io/malla-quiz/';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: null,
			precompress: false,
			strict: true,
			// hydrate the <div id="svelte"> element in src/app.html
			target: '#svelte',
			paths: {
				base: process.env.NODE_ENV === 'production' ? githubPagesUrl : ''
			}
		})
	}
};

export default config;
