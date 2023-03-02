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

<header class="flex items-center justify-between py-6 md:pt-14 md:pb-[3.25rem]">
  <img class="w-7 md:w-8" src="/logo.svg" alt="" width="34" height="38" />
  <button
    class="relative flex items-center gap-x-4 text-sm font-bold md:gap-x-4.5
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
      class="top-full left-auto right-0 mt-4.5 w-[11.5rem] cursor-default
      rounded-2xl bg-[#1f1f1f] p-6 text-inherit shadow-md shadow-[#a445ed]"
      bind:this={dialog}
      on:close={setFont}
    >
      <form method="dialog" class="grid gap-y-4 text-lg font-bold">
        {#each Object.keys(Font).splice(3) as category, index (category)}
          {@const font = `font-${category.toLowerCase()}`}
          <button
            class={`${font} text-left hover:text-[#a445ed]`}
            value={index}
          >
            {category}
            {#if category === 'Sans'}Serif{/if}
          </button>
        {/each}
      </form>
    </dialog>
  </button>
</header>
