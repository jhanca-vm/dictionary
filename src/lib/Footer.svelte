<script lang="ts">
  export let sourceUrl: string
</script>

<footer
  class="border-t border-t-[#3a3a3a] pt-6 pb-20 text-sm leading-tight md:flex
    md:gap-x-5 md:pt-5 md:pb-28"
>
  <h4 class="mb-2 text-[#757575] underline underline-offset-2 md:mb-0">
    Source
  </h4>
  <a
    class="flex gap-x-2 underline"
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
