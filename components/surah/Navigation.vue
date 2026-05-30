<script lang="ts" setup>
import type { ISurah } from "~/models/data";

// Emit so parent (mobile sidebar) knows to close when user navigates
const emit = defineEmits<{ navigate: [] }>();

const { data } = await useFetch<ISurah[]>("/api/surah");
const surahName = ref<string>("");

const handleSearch = (e: Event) => {
  surahName.value = (e.target as HTMLInputElement).value;
};

const filteredSurah = computed<ISurah[]>(() => {
  if (!data.value) return [];
  const q = surahName.value.toLowerCase().trim();
  if (!q) return data.value;
  return data.value.filter(
    (s) =>
      s.latinName.toLowerCase().includes(q) ||
      s.name.includes(q) ||
      s.meaning.toLowerCase().includes(q),
  );
});

const handleNavigate = () => emit("navigate");
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Logo -->
    <div class="px-4 pt-5 pb-4 border-b border-app flex-shrink-0">
      <NuxtLink to="/" class="flex items-center gap-2 group" @click="handleNavigate">
        <div
          class="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform duration-200"
        >
          <Icon
            name="material-symbols:menu-book-rounded"
            class="text-sm text-white"
          />
        </div>
        <span
          class="text-base font-bold font-oleo text-fire-gradient group-hover:opacity-90 transition-opacity"
        >
          Kalamullah
        </span>
      </NuxtLink>
    </div>

    <!-- Search -->
    <div class="px-3 pt-3 pb-2 flex-shrink-0">
      <div class="relative">
        <Icon
          name="material-symbols:search"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-app-subtle text-base pointer-events-none"
        />
        <input
          type="text"
          @input="handleSearch"
          placeholder="Cari surah..."
          class="w-full pl-9 pr-4 py-2 bg-app-card border border-app rounded-xl text-xs text-app placeholder-app-subtle focus:outline-none focus:border-amber-500/50 transition-all duration-200 font-quicksand"
        />
      </div>
      <p class="text-[10px] text-app-subtle mt-1.5 px-1 font-opensans">
        {{ filteredSurah.length }} surah
      </p>
    </div>

    <!-- Surah list -->
    <div
      class="flex-1 overflow-y-auto scrollbar-gold px-2 py-1"
      style="direction: rtl"
    >
      <div class="grid grid-cols-1 gap-1" @click="handleNavigate">
        <SurahCard :surah="filteredSurah" />
      </div>

      <div
        v-if="filteredSurah.length === 0"
        class="text-center py-12"
        style="direction: ltr"
      >
        <Icon
          name="material-symbols:search-off-rounded"
          class="text-3xl text-app-subtle mb-2"
        />
        <p class="text-xs text-app-subtle font-opensans">
          Surah tidak ditemukan
        </p>
      </div>
    </div>
  </div>
</template>
