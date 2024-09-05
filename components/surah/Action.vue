<script lang="ts" setup>
import type { IVerse } from "~/types/interfaces";

defineProps<{
  selectedVerse: IVerse | undefined;
  verse: IVerse;
  onPlay: Function;
  onStop: Function;
  onPause: Function;
  isPaused: Boolean;
}>();
</script>

<template>
  <div
    :class="{
      'border-orange-500': selectedVerse === verse,
      'border-gray-800/50': selectedVerse !== verse,
    }"
    class="flex flex-col py-4 pe-4 gap-4 border-e"
  >
    <span
      class="text-4xl text-gray-50 cursor-pointer hover:text-gray-300 transition-all duration-100 ease-in-out"
    >
      <Icon name="material-symbols:book-2-rounded" />
    </span>
    <span
      v-if="selectedVerse !== verse || isPaused"
      @click="onPlay(verse)"
      class="text-4xl text-yellow-400 cursor-pointer hover:text-yellow-600 transition-all duration-100 ease-in-out"
    >
      <Icon name="material-symbols:play-circle-rounded" />
    </span>

    <span
      v-if="selectedVerse === verse && !isPaused"
      @click="onPause(verse)"
      class="text-4xl text-yellow-400 cursor-pointer hover:text-yellow-600 transition-all duration-100 ease-in-out"
    >
      <Icon name="material-symbols:pause-circle-rounded" />
    </span>

    <span
      v-if="selectedVerse === verse"
      @click="onStop()"
      class="text-4xl text-red-500 cursor-pointer hover:text-red-700 transition-all duration-100 ease-in-out"
    >
      <Icon name="bi:stop-circle" />
    </span>
  </div>
</template>

<style scoped></style>
