<script lang="ts">
  import type { Definition as DefinitionType, Error } from '$lib/types'
  import { CustomError } from '$lib/utils'
  import Definition from '$lib/Definition.svelte'
  import Footer from '$lib/Footer.svelte'

  let query = ''
  let hasError = false
  let promise: Promise<DefinitionType[]> | undefined

  $: if (query) hasError = false

  function handleSubmit() {
    if (query) {
      promise = new Promise((resolve, reject) => {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`).then(
          async response => {
            const data: DefinitionType[] | Error = await response.json()

            response.ok
              ? resolve(data as DefinitionType[])
              : reject(new CustomError(data as Error))
          }
        )
      })
    } else {
      hasError = true
    }
  }
</script>

<svelte:head>
  <title>Dictionary</title>
</svelte:head>

<form on:submit|preventDefault={handleSubmit}>
  <label
    class="bg-[#f4f4f4] rounded-2xl px-6 py-3.5 flex gap-x-6 outline-1
      outline-[#a445ed] focus-within:outline dark:bg-[#1f1f1f] md:py-4.5"
    class:outline={hasError}
    class:outline-[#ff5252]={hasError}
  >
    <input
      class="flex-1 w-full font-bold leading-none outline-none caret-[#a445ed]
        placeholder:text-inherit placeholder:opacity-25 md:text-xl"
      type="search"
      name="query"
      placeholder="Search for any word…"
      bind:value={query}
    />
    <button type="submit">
      <img class="w-4" src="/icons/search.svg" alt="" width="18" height="18" />
    </button>
  </label>
  {#if hasError}
    <p class="mt-2 text-xl text-[#ff5252]">Whoops, can’t be empty…</p>
  {/if}
</form>
{#if promise}
  {#await promise then [definition]}
    {@const [sourceUrl] = definition.sourceUrls}
    <Definition data={definition} />
    <Footer {sourceUrl} />
  {:catch { title, message, resolution }}
    <div class="my-[8.25rem] text-center">
      <span class="text-6xl leading-none">😕</span>
      <h1 class="font-bold text-xl mt-11 mb-6">{title}</h1>
      <p class="text-[#757575] text-lg leading-6">{message} {resolution}</p>
    </div>
  {/await}
{/if}
