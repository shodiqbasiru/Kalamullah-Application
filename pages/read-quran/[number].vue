<script lang="ts" setup>
import type { IInterpretations, IVerse } from "~/types/interfaces";

const { data, interpretation } = useSurahData();
const {
  data: { selectedVerse, isPaused, qori },
  methods: { playAudio, handlePlay, handlePause, handleStop },
} = useAudioPlayer();

const verse = ref();
const el = ref<HTMLElement | null>(null);
const gradientBarWidth = ref("0%");
const isOpen = ref(false);
const tafsir = ref<string | undefined>(undefined);
const surahName = ref<string | undefined>(undefined);

const showModal = (verse: IVerse) => {
  selectedVerse.value = verse;
  tafsir.value = interpretation.value?.interpretations.find(
    (i) => i.verse === verse.verseNumber
  )?.text;
  surahName.value = interpretation.value?.latinName;
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
  selectedVerse.value = undefined;
  tafsir.value = undefined;
  surahName.value = undefined;
};

const qoriOptions = [
  { label: "Abdullah Al Juhany", value: "01" },
  { label: "Abdul Muhsin Al Qosim", value: "02" },
  { label: "Abdurrahman As Sudais", value: "03" },
  { label: "Ibrahim Al Dossari", value: "04" },
  { label: "Misyari Rasyid Al Afasi", value: "05" },
];

const verseOptions = computed(() => {
  return data.value?.verses.map((v) => ({
    label: v.verseNumber,
    value: v.verseNumber,
  }));
});

const updateGradientBarWidth = () => {
  if (el.value) {
    const scrollTop = el.value.scrollTop;
    const scrollHeight = el.value.scrollHeight - el.value.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    gradientBarWidth.value = `${scrollPercentage}%`;
  }
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

watch(qori, (newQori) => {
  if (selectedVerse.value) {
    playAudio(selectedVerse.value);
  }
});

watch(verse, (newVerse) => {
  if (newVerse) {
    const verseElement = document.getElementById(`verse-${newVerse}`);
    if (verseElement) {
      verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
});

watch(data, () => {
  verse.value = data.value?.verses[0].verseNumber;
});

onMounted(() => {
  if (el.value) {
    el.value.addEventListener("scroll", updateGradientBarWidth);
  }
});

onUnmounted(() => {
  if (el.value) {
    el.value.removeEventListener("scroll", updateGradientBarWidth);
  }

  if (selectedVerse.value) {
    handleStop();
  }
});
</script>

<template>
  <div class="fixed inset-0 grid grid-cols-5 gap-4 w-full dark:bg-gray-900">
    <div class="flex flex-col col-span-1 bg-black p-4">
      <SurahNavigation />
    </div>
    <div class="col-span-3 flex-1 bg-black p-4">
      <AppModal
        :isOpen="isOpen"
        @closeModal="closeModal"
        :verse="selectedVerse"
        :tafsir="tafsir"
        :surahName="surahName"
      />

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
              :showModal="showModal"
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
        <!-- <NuxtLink to="/" class="px-8">
          <img
            src="/dark-logo-1.svg"
            alt="kalamullah"
            class="w-full h-[180px]"
          />
        </NuxtLink> -->
        <div class="flex flex-col gap-4 mt-5">
          <h2
            class="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-red-500 to-orange-800 text-transparent bg-clip-text font-oleo uppercase"
          >
            Pengaturan
          </h2>
          <div class="grid grid-cols-3 gap-4 justify-between items-center mb-3">
            <label for="ayat">Ayat</label>
            <div class="col-span-2">
              <USelect
                name="ayat"
                placeholder="Pilih Ayat"
                v-model="verse"
                size="xl"
                :options="verseOptions"
              />
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4 justify-between items-center mb-3">
            <label for="qori">Qori</label>
            <div class="col-span-2">
              <USelect
                name="qori"
                placeholder="Pilih Qori"
                v-model="qori"
                size="xl"
                :options="qoriOptions"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
