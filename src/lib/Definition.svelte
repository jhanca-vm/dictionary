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

<section class="my-6 flex justify-between items-center md:mt-12">
  <div>
    <h1
      class="font-bold text-[2rem] leading-10 mb-2 md:text-[4rem]
        md:leading-none"
    >
      {word}
    </h1>
    {#if phonetic}
      <p class="text-[#a445ed] text-lg leading-6 md:text-2xl md:leading-snug">
        {phonetic.text}
      </p>
    {/if}
  </div>
  {#if phonetic}<Audio src={phonetic.audio} />{/if}
</section>
{#each meanings as { partOfSpeech, definitions, synonyms, antonyms }}
  <section class="my-8 md:my-10">
    <h2
      class="font-bold text-lg leading-5 flex items-center gap-x-4 md:text-2xl
        md:leading-7"
      class:italic={font !== 'Mono'}
    >
      {partOfSpeech}<span class="h-px bg-[#e9e9e9] flex-1 dark:bg-[#3a3a3a]" />
    </h2>
    <h3
      class="text-[#757575] leading-5 mt-8 md:mt-10 md:text-[1.25rem]
        md:leading-6"
    >
      Meaning
    </h3>
    <ul class="grid gap-y-3 mt-4 md:mt-6 md:ml-5 md:text-lg md:leading-6">
      {#each definitions as { definition, example }}
        <li class="grid grid-cols-[max-content,_1fr]">
          <div>
            <p>{definition}</p>
            {#if example}<p class="text-[#757575] mt-3">"{example}"</p>{/if}
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
    @apply content-[''] w-[0.3125rem] h-[0.3125rem] bg-[#8f19e8] rounded-full
      mt-2.5 mr-5;
  }
</style>
