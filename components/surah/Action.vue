<script lang="ts" setup>
import type { IVerse } from "~/models/data";

/**
 * SurahAction — tombol aksi per-ayat di verse reader.
 *
 * Sekarang langsung consume useAudioPlayer() tanpa prop drilling
 * onPlay/onPause/onStop, karena state audio player sudah global.
 * Hanya prop yang benar-benar verse-specific yang diterima lewat props.
 */
const props = defineProps<{
  verse: IVerse;
  showModal: () => void;
}>();

const {
  data: { selectedVerse, isPaused, isPlaying },
  methods: { handlePlay, handlePause },
} = useAudioPlayer();

const isThisVerseActive = computed(
  () => selectedVerse.value?.verseNumber === props.verse.verseNumber,
);

const isThisVersePlaying = computed(
  () => isThisVerseActive.value && isPlaying.value && !isPaused.value,
);

const isThisVersePaused = computed(
  () => isThisVerseActive.value && isPaused.value,
);

const togglePlayPause = () => {
  if (isThisVerseActive.value) {
    // Ayat ini sudah aktif → toggle pause/resume
    handlePause();
  } else {
    // Mulai dari ayat ini, auto-advance terus ke berikutnya
    handlePlay(props.verse);
  }
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-start gap-2 pt-2 w-10 flex-shrink-0"
  >
    <!-- Tafsir button -->
    <button
      @click="showModal()"
      class="w-9 h-9 rounded-xl flex items-center justify-center text-app-subtle hover:text-amber-400 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all duration-200"
      title="Lihat Tafsir"
    >
      <Icon name="material-symbols:book-2-rounded" class="text-lg" />
    </button>

    <!-- Play / Pause button (single toggle) -->
    <button
      @click="togglePlayPause"
      :class="[
        'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 border',
        isThisVersePlaying
          ? 'text-amber-400 bg-amber-500/15 border-amber-500/30 hover:bg-amber-500/25 pulse-gold'
          : isThisVersePaused
            ? 'text-amber-300 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20'
            : 'text-app-subtle hover:text-amber-400 hover:bg-amber-500/10 border-transparent hover:border-amber-500/20',
      ]"
      :title="
        isThisVersePlaying
          ? 'Jeda (Space)'
          : isThisVersePaused
            ? 'Lanjutkan'
            : 'Putar dari ayat ini'
      "
    >
      <Icon
        :name="
          isThisVersePlaying
            ? 'material-symbols:pause-circle-rounded'
            : 'material-symbols:play-circle-rounded'
        "
        class="text-lg"
      />
    </button>

    <!-- Playing indicator dot — visible only for active verse -->
    <div
      v-if="isThisVerseActive"
      class="flex items-end gap-px h-4 justify-center"
      :class="isThisVersePlaying ? 'opacity-100' : 'opacity-30'"
    >
      <span
        v-for="(h, i) in [8, 14, 10, 6]"
        :key="i"
        class="w-0.5 rounded-full bg-amber-500"
        :class="
          isThisVersePlaying ? 'animate-[bounce_0.6s_ease-in-out_infinite]' : ''
        "
        :style="{ height: h + 'px', animationDelay: i * 0.1 + 's' }"
      />
    </div>
  </div>
</template>
