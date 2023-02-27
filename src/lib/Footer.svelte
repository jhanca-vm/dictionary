<script lang="ts">
  export let sourceUrl: string
</script>

<footer
  class="border-t border-t-[#e9e9e9] pt-6 pb-20 text-sm leading-tight
    dark:border-t-[#3a3a3a] md:pt-5 md:pb-28 md:flex md:gap-x-5"
>
  <h4 class="text-[#757575] mb-2 underline underline-offset-2 md:mb-0">
    Source
  </h4>
  <a
    class="underline flex gap-x-2"
    href={sourceUrl}
    target="_blank"
    rel="noreferrer"
  >
    {sourceUrl}
    <img
      class="w-3"
      src="/icons/new-window.svg"
      alt=""
      width="14"
      height="14"
    />
  </a>
</footer>
