<script lang="ts" setup>
const { data } = await useFetch("/api/surah");
</script>

<template>
  <div
    class="flex flex-col min-w-[500px] bg-gray-900 text-white p-2 h-[85vh] border-e border-gray-800/50 overflow-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-900"
  >
    <SurahCard :surah="data" />
  </div>
</template>

<style></style>
