<script lang="ts">
  import type { Definition } from './types'
  import { getContext } from 'svelte'
  import Audio from './Audio.svelte'
  import RelatedWords from './RelatedWords.svelte'

  export let data: Definition

  const font = getContext('font')

  $: ({ word, phonetics, meanings } = data)

  $: phonetic = phonetics.find(({ text, audio }) => text && audio !== '')
</script>

<section class="my-6 flex items-center justify-between md:mt-12">
  <div>
    <h1
      class="mb-2 text-[2rem] font-bold leading-10 md:text-[4rem]
        md:leading-none"
    >
      {word}
    </h1>
    {#if phonetic}
      <p class="text-lg leading-6 text-[#a445ed] md:text-2xl md:leading-snug">
        {phonetic.text}
      </p>
    {/if}
  </div>
  {#if phonetic}<Audio src={phonetic.audio} />{/if}
</section>
{#each meanings as { partOfSpeech, definitions, synonyms, antonyms }}
  <section class="my-8 md:my-10">
    <h2
      class="flex items-center gap-x-4 text-lg font-bold leading-5 md:text-2xl
        md:leading-7"
      class:italic={font !== 'Mono'}
    >
      {partOfSpeech}<span class="h-px flex-1 bg-[#3a3a3a]" />
    </h2>
    <h3
      class="mt-8 leading-5 text-[#757575] md:mt-10 md:text-[1.25rem]
        md:leading-6"
    >
      Meaning
    </h3>
    <ul class="mt-4 grid gap-y-3 md:mt-6 md:ml-5 md:text-lg md:leading-6">
      {#each definitions as { definition, example }}
        <li class="grid grid-cols-[max-content,_1fr]">
          <div>
            <p>{definition}</p>
            {#if example}<p class="mt-3 text-[#757575]">"{example}"</p>{/if}
          </div>
        </li>
      {/each}
    </ul>
    <RelatedWords label="Synonyms" words={synonyms} />
    <RelatedWords label="Antonyms" words={antonyms} />
  </section>
{/each}

<style lang="postcss">
  li::before {
    @apply mt-2.5 mr-5 h-[0.3125rem] w-[0.3125rem] rounded-full bg-[#8f19e8]
      content-[''];
  }
</style>
