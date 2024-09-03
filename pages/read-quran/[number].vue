<script lang="ts" setup>
const route = useRoute();

const { number } = route.params;
const { data } = await useFetch(`/api/surah/${number}`);
</script>

<template>
  <div class="flex gap-4">
    <div class="bg-black p-4 rounded-xl">
      <SurahSidebar />
    </div>
    <div class="flex-1 bg-black p-4 rounded-xl">
      <div
        class="p-4 mb-8 text-white text-center bg-gray-900 border-b border-gray-800/50 drop-shadow-2xl shadow-gray-500 rounded-lg me-6"
      >
        <div class="flex items-center justify-center gap-8 mt-8">
          <h2
            class="text-4xl font-bold font-oleo bg-gradient-to-r from-yellow-500 via-red-500 to-orange-800 text-transparent bg-clip-text"
          >
            {{ data?.latinName }}
          </h2>
          <span class="text-4xl"> - </span>
          <h1 class="text-4xl font-bold font-lpmq" style="direction: rtl">
            {{ data?.name }}
          </h1>
        </div>
        <p class="text-md mt-4">
          {{ data?.meaning }} - {{ data?.verseCount }} ayat -
          {{ data?.revelationPlace }}
        </p>
      </div>

      <div
        class="h-[65vh] border-e border-gray-800/50 overflow-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-950"
      >
        <div
          v-for="verse in data?.verses"
          :key="verse.verseNumber"
          class="px-8 py-12 text-white bg-gray-900 border-b border-gray-800/50 drop-shadow-2xl shadow-gray-500 rounded-xl mb-4 me-4"
        >
          <div class="flex flex-col gap-8" style="direction: rtl">
            <div class="flex justify-between items-center">
              <h2 class="text-4xl font-lpmq">{{ verse.arabicText }}</h2>
              <h2 class="text-2xl font-bold font-oleo" style="direction: ltr">
                {{ verse.verseNumber }}
              </h2>
            </div>
            <div style="direction: ltr">
              <p
                class="text-md bg-gradient-to-r from-yellow-500 via-red-500 to-orange-800 text-transparent bg-clip-text"
              >
                {{ verse.latinText }}
              </p>
              <p>
                {{ verse.translation }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
