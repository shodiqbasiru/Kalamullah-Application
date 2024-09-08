<script lang="ts" setup>
import type { ISurah } from "~/models/data";

const { data } = await useFetch("/api/surah");
const surahName = ref<string>("");

const handleSearch = (e: Event) => {
  const target = e.target as HTMLInputElement;
  surahName.value = target.value;
};

const filteredSurah = computed(() => {
  if (!data.value) return [];
  return data.value.filter((surah: ISurah) =>
    surah.latinName.toLowerCase().includes(surahName.value.toLowerCase())
  );
});
</script>

<template>
  <div class="w-full mb-4">
    <NuxtLink to="/" class="px-8">
      <img src="/dark-logo-2.svg" alt="kalamullah" class="w-full h-[100px]" />
    </NuxtLink>
    <div class="flex px-3">
      <input
        type="text"
        @input="handleSearch"
        placeholder="Cari surah"
        class="w-full px-4 py-2 bg-gray-800 text-white border border-gray-800 rounded-s-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
      <button
        @click="handleSearch"
        class="bg-gradient-to-br from-yellow-500 to-orange-800 px-4 py-2 flex justify-center items-center rounded-e-lg"
      >
        <span class="text-2xl">
          <Icon name="material-symbols:search" />
        </span>
      </button>
    </div>
  </div>

  <div
    class="flex flex-col w-full text-white p-2 border-e border-gray-800/50 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-black overflow-y-auto max-h-[calc(80vh-1rem)]"
  >
    <div class="grid grid-cols-1 gap-4" style="direction: rtl">
      <SurahCard :surah="filteredSurah" />
    </div>
    <div v-if="filteredSurah.length === 0" class="text-center text-white">
      <p>Surah tidak ditemukan</p>
    </div>
  </div>
</template>

<style></style>
