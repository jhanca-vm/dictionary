<script lang="ts">
  import { getContext } from 'svelte'
  import { autoCloseDialog } from './utils'

  enum Font {
    Sans,
    Serif,
    Mono
  }

  let font = getContext<string>('font')
  let dialog: HTMLDialogElement | undefined

  function setFont() {
    const newFont = Font[Number(dialog?.returnValue)]

    document.body.classList.replace(
      `font-${font.toLowerCase()}`,
      `font-${newFont.toLowerCase()}`
    )

    font = newFont

    localStorage.setItem('font', font)
  }
</script>

<button
  class="flex items-center gap-x-4 font-bold text-sm relative md:gap-x-4.5
    md:text-lg lg:gap-x-4"
  use:autoCloseDialog={dialog}
  on:click={() => dialog?.show()}
>
  <span>
    {font}
    {#if font === 'Sans'}Serif{/if}
  </span>
  <img class="w-3" src="/icons/arrow-down.svg" alt="" width="14" height="8" />
  <dialog
    class="top-full left-auto right-0 w-[11.5rem] p-6 rounded-2xl shadow-md
      mt-4.5 cursor-default text-inherit dark:bg-[#1f1f1f]
      dark:shadow-[#a445ed]"
    bind:this={dialog}
    on:close={setFont}
  >
    <form method="dialog" class="grid gap-y-4 font-bold text-lg">
      {#each Object.keys(Font).splice(3) as category, index (category)}
        {@const font = `font-${category.toLowerCase()}`}
        <button class={`${font} text-left hover:text-[#a445ed]`} value={index}>
          {category}
          {#if category === 'Sans'}Serif{/if}
        </button>
      {/each}
    </form>
  </dialog>
</button>
