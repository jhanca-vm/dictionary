<script lang="ts">
  import { getContext } from 'svelte'
  import DarkModeIcon from './DarkModeIcon.svelte'
  import FontSelect from './FontSelect.svelte'

  let darkMode = getContext<boolean>('dark')

  function handleChange() {
    darkMode
      ? localStorage.setItem('theme', 'dark')
      : localStorage.setItem('theme', 'light')

    document.documentElement.classList.toggle('dark')
  }
</script>

<header class="py-6 flex justify-between items-center md:pt-14 md:pb-[3.25rem]">
  <img class="w-7 md:w-8" src="/logo.svg" alt="" width="34" height="38" />
  <div class="flex items-center">
    <FontSelect />
    <div
      class="border-l border-l-[#e9e9e9] ml-4 pl-4 flex items-center gap-x-3
        h-8 md:gap-x-5 md:ml-[1.625rem] md:pl-[1.625rem]"
    >
      <label
        aria-label="Dark mode"
        class="bg-[#757575] w-10 h-5 rounded-[0.625rem] dark:bg-[#a445ed]
          p-[0.1875rem]"
        for="dark"
      >
        <span
          class="bg-white w-3.5 h-full block rounded-full duration-150
            dark:translate-x-5"
        />
      </label>
      <input
        class="hidden"
        id="dark"
        type="checkbox"
        bind:checked={darkMode}
        on:change={handleChange}
      />
      <label for="dark" class="text-[#838383] dark:text-[#a445ed]">
        <DarkModeIcon />
      </label>
    </div>
  </div>
</header>
