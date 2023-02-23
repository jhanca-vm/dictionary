import adapter from '@sveltejs/adapter-static'
import sveltePreprocess from 'svelte-preprocess'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess({
    postcss: { plugins: [tailwindcss(), autoprefixer()] }
  }),
  kit: {
    adapter: adapter()
  }
}

export default config
