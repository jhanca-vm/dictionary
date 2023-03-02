<script lang="ts">
  import '@fontsource/inter/variable.css'
  import '@fontsource/lora/variable.css'
  import '@fontsource/lora/variable-italic.css'
  import '@fontsource/inconsolata/variable.css'
  import '../app.postcss'

  import { setContext } from 'svelte'
  import { fly } from 'svelte/transition'
  import Header from '$lib/Header.svelte'

  const promise = new Promise<void>(resolve => {
    const font = localStorage.getItem('font')

    if (font && font !== 'Sans') {
      document.body.classList.replace('font-sans', `font-${font.toLowerCase()}`)
      setContext('font', font)
    } else {
      setContext('font', 'Sans')
    }

    resolve()
  })
</script>

{#await promise}
  <figure class="grid h-screen place-items-center">
    <img
      class="w-24 animate-bounce"
      src="/logo.svg"
      alt="Loading..."
      width="34"
      height="38"
    />
  </figure>
{:then}
  <div class="mx-auto max-w-[46rem]" in:fly={{ duration: 300 }}>
    <Header />
    <main>
      <slot />
    </main>
  </div>
{/await}
