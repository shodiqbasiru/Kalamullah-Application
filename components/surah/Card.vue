<script setup lang="ts">
import type { ISurah } from "~/models/data";

defineProps<{ surah: ISurah[] }>();

const router = useRouter();
const route = useRoute();

const handleClick = (number: number) => {
  router.push(`/surah/${number}`);
};

const isCurrentSurah = (number: number) => route.path === `/surah/${number}`;

const placeColor = (place: string) =>
  place?.toLowerCase() === "makkiyah"
    ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
    : "bg-blue-500/10 text-blue-400 border-blue-500/20";
</script>

<template>
  <div
    v-for="data in surah"
    :key="data.number"
    @click="handleClick(data.number)"
    :class="[
      'group relative flex items-center gap-3 p-3 rounded-xl cursor-pointer',
      'border transition-all duration-200 ease-out',
      isCurrentSurah(data.number)
        ? 'border-amber-500/40 bg-amber-500/8'
        : 'border-transparent hover:border-app hover:bg-app-card',
    ]"
    style="direction: ltr"
  >
    <!-- Active indicator -->
    <div
      v-if="isCurrentSurah(data.number)"
      class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full bg-amber-500"
    />

    <!-- Number badge -->
    <div
      class="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-amber-500/8 border border-amber-500/15 group-hover:bg-amber-500/15 group-hover:border-amber-500/25 transition-all duration-200"
    >
      <span class="text-xs font-bold text-amber-500 font-oleo">{{
        data.number
      }}</span>
    </div>

    <!-- Latin name + meta -->
    <div class="flex-1 min-w-0">
      <p
        class="text-xs font-bold font-oleo text-fire-gradient truncate leading-tight"
      >
        {{ data.latinName }}
      </p>
      <p class="text-[10px] text-app-subtle font-opensans truncate mt-0.5">
        {{ data.meaning }} · {{ data.verseCount }} ayat
      </p>
    </div>

    <!-- Arabic name -->
    <p
      class="flex-shrink-0 text-base font-lpmq text-amber-500/70 group-hover:text-amber-500 transition-colors duration-200"
      style="direction: rtl"
    >
      {{ data.name }}
    </p>
  </div>
</template>
