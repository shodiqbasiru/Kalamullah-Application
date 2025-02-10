<script lang="ts" setup>
useHead({
  title: "Kalamullah | Surah Page",
  meta: [
    {
      name: "description",
      content: "Surah page",
    },
  ],
});

const {
  computed: { filteredSurah },
  methods: { getAllSurah, handleSearch },
} = useSurahData();
getAllSurah();
</script>

<template>
  <PageContainer class="min-h-[calc(80vh-4rem)]">
    <div class="grid grid-cols-4 my-16">
      <div class="col-span-2 col-start-2 col-end-4">
        <div
          class="grid grid-cols-2 bg-gradient-to-br from-yellow-500 to-orange-800 p-8 rounded-xl"
        >
          <div>
            <span class="flex items-center gap-2">
              <Icon
                name="material-symbols:menu-book-rounded"
                class="text-2xl"
              />
              <p class="text-sm font-semibold">Terakhir dibaca</p>
            </span>
            <div class="mt-4">
              <p class="text-4xl font-serif font-extrabold">Al-Kahfi</p>
              <p class="text-sm text-gray-200">Ayat ke-50</p>
            </div>
          </div>
          <div class="relative">
            <img
              src="~/assets/images/quran-kal.png"
              alt="kalamullah"
              class="w-[150px] object-cover block ml-auto"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center px-3 mb-4">
      <h2
        class="text-4xl font-bold font-oleo bg-gradient-to-r from-yellow-500 via-red-500 to-orange-800 text-transparent bg-clip-text"
      >
        Dafar Surah
      </h2>
      <div class="flex">
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
    <div class="grid grid-cols-3 gap-4" style="direction: rtl">
      <SurahCard :surah="filteredSurah" />
    </div>
    <div
      v-if="filteredSurah.length === 0"
      class="text-center text-white mt-4 h-[50px]"
    >
      <p>Surah tidak ditemukan</p>
    </div>
  </PageContainer>
</template>

<style></style>
