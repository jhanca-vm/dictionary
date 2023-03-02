/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: [{ pattern: /font-(sans|serif|mono)/ }],
  theme: {
    boxShadow: {
      md: '0px 5px 30px rgba(0, 0, 0, 0.1)'
    },
    fontFamily: {
      sans: ['InterVariable', 'sans-serif'],
      serif: ['LoraVariable', 'serif'],
      mono: ['InconsolataVariable', 'monospace']
    },
    extend: {
      spacing: {
        4.5: '1.125rem'
      }
    }
  }
}
