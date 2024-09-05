<script lang="ts" setup>
import type { IVerse } from "~/types/interfaces";

const selectedVerse = ref<IVerse>();
const currentAudio = ref<HTMLMediaElement | null>(null);
const isPaused = ref(false);
const route = useRoute();
const el = ref<HTMLElement | null>(null);
const gradientBarWidth = ref("0%");

const { number } = route.params;
const { data } = await useFetch(`/api/surah/${number}`);

const getNextVerse = (currentVerse: IVerse): IVerse | undefined => {
  const currentIndex = data.value?.verses.findIndex(
    (v) => v.verseNumber === currentVerse.verseNumber
  );
  if (currentIndex === undefined) return;
  return data.value?.verses[currentIndex + 1];
};

const playAudio = (verse: IVerse) => {
  const audio = new Audio(verse.audio["01"]);
  currentAudio.value = audio;
  audio.play();

  audio.onended = () => {
    const nextVerse = getNextVerse(verse);
    if (nextVerse) {
      handlePlay(nextVerse);
    } else {
      selectedVerse.value = undefined;
      currentAudio.value = null;
    }
  };
};

const handlePlay = (verse: IVerse) => {
  if (currentAudio.value) {
    currentAudio.value.pause();
    currentAudio.value.currentTime = 0;
  }
  selectedVerse.value = verse;
  playAudio(verse);
  isPaused.value = false;
};

const handlePause = () => {
  if (currentAudio.value) {
    if (isPaused.value) {
      currentAudio.value.play();
      isPaused.value = false;
    } else {
      currentAudio.value.pause();
      isPaused.value = true;
    }
  }
};

const handleStop = () => {
  if (currentAudio.value) {
    currentAudio.value.pause();
    currentAudio.value.currentTime = 0;
  }
  selectedVerse.value = undefined;
  currentAudio.value = null;
};

watchEffect(() => {
  if (el.value && selectedVerse.value) {
    const verseElement = el.value.querySelector(
      `#verse-${selectedVerse.value.verseNumber}`
    );

    if (verseElement) {
      verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
});

const updateGradientBarWidth = () => {
  if (el.value) {
    const scrollTop = el.value.scrollTop;
    const scrollHeight = el.value.scrollHeight - el.value.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    gradientBarWidth.value = `${scrollPercentage}%`;
  }
};

onMounted(() => {
  if (el.value) {
    el.value.addEventListener("scroll", updateGradientBarWidth);
  }
});

onUnmounted(() => {
  if (el.value) {
    el.value.removeEventListener("scroll", updateGradientBarWidth);
  }
});
</script>

<template>
  <div class="fixed inset-0 grid grid-cols-5 gap-4 w-full dark:bg-gray-900">
    <div class="flex flex-col col-span-1 bg-black p-4">
      <SurahNavigation />
    </div>
    <div class="col-span-3 flex-1 bg-black p-4">
      <div
        class="mb-4 text-white text-center drop-shadow-2xl shadow-gray-500 rounded-lg"
      >
        <div class="flex justify-center gap-8 mt-8">
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
      <div class="bg-gray-900 h-2 rounded-full mb-8 me-6">
        <div
          class="bg-gradient-to-r from-yellow-500 via-red-500 to-orange-800 h-2 rounded-full"
          :style="{ width: gradientBarWidth }"
        ></div>
      </div>
      <div
        ref="el"
        class="border-e border-gray-800/50 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-black overflow-y-auto max-h-[calc(80vh-1rem)]"
      >
        <div
          v-for="verse in data?.verses"
          :id="'verse-' + verse.verseNumber"
          :key="verse.verseNumber"
          :class="{
            'bg-gray-800 border border-orange-500': selectedVerse === verse,
            'bg-gray-900': selectedVerse !== verse,
          }"
          class="pe-8 ps-4 text-white drop-shadow-2xl shadow-gray-500 rounded-xl mb-4 me-4"
        >
          <div class="flex justify-between gap-4">
            <SurahAction
              :selectedVerse="selectedVerse"
              :verse="verse"
              :onPlay="handlePlay"
              :onPause="handlePause"
              :onStop="handleStop"
              :isPaused="isPaused"
            />

            <div
              class="flex-1 flex flex-col gap-8 py-12"
              style="direction: rtl"
            >
              <div class="flex justify-between items-center">
                <h2
                  class="text-4xl font-lpmq max-w-[90%]"
                  style="line-height: 5rem"
                >
                  {{ verse.arabicText }}
                </h2>
                <h2
                  class="text-2xl font-bold font-oleo text-center"
                  style="direction: ltr"
                >
                  {{ verse.verseNumber }}
                </h2>
              </div>
              <div style="direction: ltr">
                <p
                  class="text-md bg-gradient-to-r from-yellow-500 via-red-500 to-orange-800 text-transparent bg-clip-text mb-3"
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
    <div class="col-span-1 bg-black p-4">
      <div class="flex flex-col gap-4">
        <NuxtLink to="/" class="px-8">
          <img
            src="/dark-logo-1.svg"
            alt="kalamullah"
            class="w-full h-[180px]"
          />
        </NuxtLink>
        <div class="flex flex-col gap-4">
          <h2
            class="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-red-500 to-orange-800 text-transparent bg-clip-text font-oleo"
          >
            Find Verse
          </h2>
          <div class="mb-4">
            <div class="flex flex-col gap-2">
              <label for="ayat">Verse</label>
              <div class="flex w-full">
                <input
                  type="number"
                  id="ayat"
                  name="ayat"
                  class="p-2 border border-gray-800/50 rounded-s-lg w-full"
                />
                <button
                  class="bg-gradient-to-r from-yellow-500 via-red-500 to-orange-800 text-white font-bold rounded-e-lg py-2 px-4"
                >
                  <Icon name="bi:search" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <h2
            class="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-red-500 to-orange-800 text-transparent bg-clip-text font-oleo"
          >
            Filter Qori
          </h2>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label for="ayat">Ayat</label>
              <input
                type="number"
                id="ayat"
                name="ayat"
                class="p-2 border border-gray-800/50 rounded-lg"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="qori">Qori</label>
              <input
                type="text"
                id="qori"
                name="qori"
                class="p-2 border border-gray-800/50 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
