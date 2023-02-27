<script lang="ts">
  export let label: string
  export let words: string[]
</script>

{#if words.length}
  <div
    class="mt-6 leading-5 grid grid-cols-[max-content,_1fr] gap-x-[1.625rem]
      md:mt-10 md:text-xl md:leading-6"
  >
    <h3 class="text-[#757575]">{label}</h3>
    <p class="flex flex-wrap gap-x-3">
      {#each words as word}
        <span class="text-[#A445ED] font-bold">{word}</span>
      {/each}
    </p>
  </div>
{/if}
