<script lang="ts">
  export let src: string

  const audio = new Audio(src)
</script>

<button aria-label="Play phonetic" on:click={() => audio.play()}>
  <svg class="w-12 fill-[#a445ed] md:w-[4.6875rem]" viewBox="0 0 75 75">
    <g fill-rule="evenodd">
      <circle cx="37.5" cy="37.5" r="37.5" />
      <path d="M29 27v21l21-10.5z" />
    </g>
  </svg>
</button>

<style lang="postcss">
  button:not(:hover) circle {
    @apply opacity-25;
  }

  button:hover path {
    @apply fill-white;
  }
</style>
