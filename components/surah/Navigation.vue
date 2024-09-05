<script lang="ts" setup>
const slug = ref<string>("");
const { data } = await useFetch("/api/surah");
</script>

<template>
  <div class="w-full">
    <NuxtLink
      to="/"
      class="px-8"
    >
      <img
        src="/dark-logo-2.svg"
        alt="kalamullah"
        class="w-full h-auto"
      />
    </NuxtLink>
  </div>
  <div
    class="flex flex-col w-full text-white p-2 border-e border-gray-800/50 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-black overflow-y-auto max-h-[calc(80vh-1rem)]"
  >
    <SurahCard :surah="data" />
  </div>
</template>

<style></style>
