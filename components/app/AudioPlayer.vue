<script lang="ts" setup>
const {
  data: {
    selectedVerse,
    isPaused,
    isPlaying,
    isActive,
    surahLatinName,
    progressPercent,
    currentTimeFormatted,
    durationFormatted,
    hasNext,
    hasPrev,
    qori,
  },
  methods: {
    handlePause,
    handleStop,
    handleNext,
    handlePrev,
    handleSeek,
    changeQori,
  },
} = useAudioPlayer();

const isMinimized = ref(false);
const isDragging = ref(false);
const seekHover = ref(false);
const seekbarEl = ref<HTMLElement | null>(null);

const qoriOptions = [
  { label: "Abdullah Al Juhany", value: "01" },
  { label: "Abdul Muhsin Al Qosim", value: "02" },
  { label: "Abdurrahman As Sudais", value: "03" },
  { label: "Ibrahim Al Dossari", value: "04" },
  { label: "Misyari Rasyid Al Afasi", value: "05" },
];
const qoriLabel = computed(
  () => qoriOptions.find((o) => o.value === qori.value)?.label ?? "Pilih Qori",
);

const onSeekClick = (e: MouseEvent) => {
  if (!seekbarEl.value) return;
  const rect = seekbarEl.value.getBoundingClientRect();
  const percent = ((e.clientX - rect.left) / rect.width) * 100;
  handleSeek(Math.min(100, Math.max(0, percent)));
};

const onSeekMouseDown = (e: MouseEvent) => {
  isDragging.value = true;
  onSeekClick(e);
  const onMove = (e: MouseEvent) => {
    if (isDragging.value) onSeekClick(e);
  };
  const onUp = () => {
    isDragging.value = false;
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  };
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
};

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if ((e.target as HTMLElement)?.tagName === "INPUT") return;
    if (e.code === "Space" && isActive.value) {
      e.preventDefault();
      handlePause();
    }
    if (e.code === "ArrowRight" && isActive.value) handleNext();
    if (e.code === "ArrowLeft" && isActive.value) handlePrev();
  };
  window.addEventListener("keydown", onKey);
  onUnmounted(() => window.removeEventListener("keydown", onKey));
});
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
    enter-from-class="translate-y-full opacity-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="isActive"
      class="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 sm:px-5 sm:pb-5 pointer-events-none"
    >
      <div
        class="max-w-3xl mx-auto pointer-events-auto"
        :class="isMinimized ? 'max-w-xs ml-auto' : ''"
      >
        <div
          class="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-app/95 backdrop-blur-2xl shadow-2xl shadow-black/40"
        >
          <!-- Top gold line -->
          <div
            class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent"
          />

          <!-- Seekbar -->
          <div
            ref="seekbarEl"
            class="relative w-full bg-app-card cursor-pointer group/seek transition-all duration-150"
            :class="seekHover ? 'h-1.5' : 'h-1'"
            @click="onSeekClick"
            @mousedown="onSeekMouseDown"
            @mouseenter="seekHover = true"
            @mouseleave="seekHover = false"
          >
            <div
              class="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 transition-all duration-100"
              :style="{ width: progressPercent + '%' }"
            />
            <div
              class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400 opacity-0 group-hover/seek:opacity-100 transition-opacity shadow-lg"
              :style="{ left: progressPercent + '%' }"
            />
          </div>

          <!-- Main row -->
          <div class="flex items-center gap-3 sm:gap-4 px-4 py-3 sm:px-5">
            <!-- Verse info -->
            <div
              class="flex-1 min-w-0"
              :class="isMinimized ? 'hidden' : 'block'"
            >
              <div class="flex items-center gap-2">
                <!-- Waveform animation -->
                <div class="flex items-end gap-px h-4 flex-shrink-0">
                  <span
                    v-for="(h, i) in [8, 14, 10, 6]"
                    :key="i"
                    class="w-0.5 rounded-full bg-amber-500"
                    :class="
                      !isPaused
                        ? 'animate-[bounce_0.6s_ease-in-out_infinite]'
                        : 'opacity-30'
                    "
                    :style="{ height: h + 'px', animationDelay: i * 0.1 + 's' }"
                  />
                </div>
                <div class="min-w-0">
                  <p
                    class="text-sm font-bold text-app truncate font-quicksand leading-tight"
                  >
                    {{ surahLatinName || "Surah" }}
                    <span class="text-amber-500"
                      >· Ayat {{ selectedVerse?.verseNumber }}</span
                    >
                  </p>
                  <p class="text-[11px] text-app-subtle truncate font-opensans">
                    {{ qoriLabel }}
                  </p>
                </div>
              </div>
               <p
                class="text-sm text-amber-600/70 dark:text-amber-200/50 font-lpmq mt-1 truncate leading-relaxed hidden sm:block"
                style="direction: rtl"
              >
                {{ selectedVerse?.arabicText?.substring(0, 60)
                }}{{ (selectedVerse?.arabicText?.length ?? 0) > 60 ? "…" : "" }}
              </p>
            </div>

            <!-- Minimized info -->
            <div v-if="isMinimized" class="flex-1 min-w-0">
               <p
                class="text-xs font-bold text-amber-600 dark:text-amber-400 truncate font-quicksand"
              >
                {{ surahLatinName }} · {{ selectedVerse?.verseNumber }}
              </p>
            </div>

            <!-- Controls -->
            <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <!-- Prev -->
              <button
                @click="handlePrev"
                :disabled="!hasPrev"
                class="w-8 h-8 rounded-xl flex items-center justify-center text-app-muted hover:text-app hover:bg-app-card disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
                title="Ayat sebelumnya (←)"
              >
                <Icon
                  name="material-symbols:skip-previous-rounded"
                  class="text-lg"
                />
              </button>

              <!-- Play/Pause (main) -->
              <button
                @click="handlePause"
                class="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-amber-900/40 hover:scale-105 active:scale-95 transition-all duration-200"
                :title="isPaused ? 'Lanjutkan (Space)' : 'Jeda (Space)'"
              >
                <Icon
                  :name="
                    isPaused
                      ? 'material-symbols:play-arrow-rounded'
                      : 'material-symbols:pause-rounded'
                  "
                  class="text-xl text-white"
                />
              </button>

              <!-- Next -->
              <button
                @click="handleNext"
                :disabled="!hasNext"
                class="w-8 h-8 rounded-xl flex items-center justify-center text-app-muted hover:text-app hover:bg-app-card disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
                title="Ayat berikutnya (→)"
              >
                <Icon
                  name="material-symbols:skip-next-rounded"
                  class="text-lg"
                />
              </button>

              <div class="w-px h-5 bg-app mx-1 hidden sm:block opacity-30" />

              <!-- Time -->
              <div
                class="text-[10px] text-app-subtle font-opensans tabular-nums hidden sm:block w-16 text-center"
              >
                {{ currentTimeFormatted }} / {{ durationFormatted }}
              </div>

              <div class="w-px h-5 bg-gray-700/40 mx-1 hidden md:block" />

              <!-- Qori selector -->
              <div v-if="!isMinimized" class="relative hidden md:block">
                <select
                  :value="qori"
                  @change="
                    (e) => changeQori((e.target as HTMLSelectElement).value)
                  "
                  class="appearance-none bg-app-card border border-app text-app-muted text-[11px] rounded-lg px-2 py-1 pr-6 focus:outline-none focus:border-amber-500/50 hover:border-amber-500/25 transition-colors duration-150 cursor-pointer font-opensans max-w-[130px] truncate"
                >
                  <option
                    v-for="opt in qoriOptions"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </option>
                </select>
                <Icon
                  name="material-symbols:keyboard-arrow-down-rounded"
                  class="absolute right-1.5 top-1/2 -translate-y-1/2 text-app-subtle text-sm pointer-events-none"
                />
              </div>

              <!-- Minimize toggle -->
              <button
                @click="isMinimized = !isMinimized"
                class="w-7 h-7 rounded-lg flex items-center justify-center text-app-subtle hover:text-app-muted hover:bg-app-card transition-all duration-150 ml-1"
                :title="isMinimized ? 'Perluas' : 'Perkecil'"
              >
                <Icon
                  :name="
                    isMinimized
                      ? 'material-symbols:open-in-full-rounded'
                      : 'material-symbols:close-fullscreen-rounded'
                  "
                  class="text-sm"
                />
              </button>

              <!-- Stop -->
              <button
                @click="handleStop"
                class="w-7 h-7 rounded-lg flex items-center justify-center text-app-subtle hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
                title="Stop"
              >
                <Icon name="material-symbols:close-rounded" class="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
