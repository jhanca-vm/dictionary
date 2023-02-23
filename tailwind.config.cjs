/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['InterVariable', 'sans-serif'],
      serif: ['LoraVariable', 'serif'],
      mono: ['InconsolataVariable', 'monospace']
    },
    extend: {}
  },
  plugins: []
}
