<script lang="ts">
  import type { Definition as DefinitionType, Error } from '$lib/types'
  import { CustomError } from '$lib/utils'
  import Skeleton from '$lib/Skeleton.svelte'
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
    class="flex gap-x-6 rounded-2xl bg-[#1f1f1f] px-6 py-3.5 outline-1
      outline-[#a445ed] focus-within:outline md:py-4.5"
    class:outline={hasError}
    class:outline-[#ff5252]={hasError}
  >
    <input
      class="w-full flex-1 font-bold leading-none caret-[#a445ed] outline-none
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
  {#await promise}
    <Skeleton />
  {:then [definition]}
    {@const [sourceUrl] = definition.sourceUrls}
    <Definition data={definition} />
    <Footer {sourceUrl} />
  {:catch { title, message, resolution }}
    <div class="my-[8.25rem] text-center">
      <span class="text-6xl leading-none">😕</span>
      <h1 class="mt-11 mb-6 text-xl font-bold">{title}</h1>
      <p class="text-lg leading-6 text-[#757575]">{message} {resolution}</p>
    </div>
  {/await}
{/if}
