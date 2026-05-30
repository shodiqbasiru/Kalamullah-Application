<script lang="ts" setup>
import type { IVerse } from "~/models/data";

definePageMeta({ layout: "surah" });

useHead({
  title: "Kalamullah | Surah",
  meta: [{ name: "description", content: "Baca Al-Qur'an Surah pilihan." }],
});

const route = useRoute();
const router = useRouter();

// ── Data ──────────────────────────────────────────────────────────────────────
const {
  methods: { getSurah },
  data: { surah },
} = useSurahData();
const { getInterpretationByNumber } = useInterpretation();
const {
  data: { selectedVerse, isPaused, isPlaying, qori },
  methods: { handleStop, setVerses, changeQori },
} = useAudioPlayer();
const { toggleSettings } = useAppSettings();
const colorMode = useColorMode();
const { setLastRead } = useLastRead();

const number = computed(() =>
  Array.isArray(route.params.number)
    ? route.params.number[0]
    : route.params.number,
);

await getSurah(number.value);
const interpretation = await getInterpretationByNumber(number.value);

// Register verses globally for audio player navigation
watch(
  () => surah.value,
  (s) => {
    if (s?.verses) setVerses(s.verses, s.latinName, s.name);
  },
  { immediate: true },
);

// ── UI state ──────────────────────────────────────────────────────────────────
const scrollEl = ref<HTMLElement | null>(null);
const readProgress = ref(0);
const isOpen = ref(false);
const tafsir = ref<string | undefined>(undefined);
const surahNameModal = ref<string | undefined>(undefined);
const modalVerse = ref<IVerse | undefined>(undefined);
const selectedVerseJump = ref<number | undefined>(undefined);
const isMobileSidebarOpen = ref(false); // left sidebar on mobile

const isDark = computed(() => colorMode.value === "dark");

const verseOptions = computed(() =>
  surah.value?.verses.map((v) => ({
    label: `Ayat ${v.verseNumber}`,
    value: v.verseNumber,
  })),
);

// ── Tafsir modal ──────────────────────────────────────────────────────────────
const showModal = (verse: IVerse) => {
  modalVerse.value = verse;
  tafsir.value = interpretation.value?.interpretations.find(
    (i) => i.verse === verse.verseNumber,
  )?.text;
  surahNameModal.value = interpretation.value?.latinName;
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
  modalVerse.value = tafsir.value = surahNameModal.value = undefined;
};

// ── Scroll progress ───────────────────────────────────────────────────────────
const updateProgress = () => {
  if (!scrollEl.value) return;
  const { scrollTop, scrollHeight, clientHeight } = scrollEl.value;
  const maxScroll = scrollHeight - clientHeight;
  readProgress.value =
    maxScroll > 0 ? Math.round((scrollTop / maxScroll) * 100) : 0;
};

// ── Jump to verse ─────────────────────────────────────────────────────────────
const jumpToVerse = (n: number | undefined) => {
  if (!n) return;
  document
    .getElementById(`verse-${n}`)
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
};

// Auto-scroll to active (playing) verse
watchEffect(() => {
  if (scrollEl.value && selectedVerse.value) {
    scrollEl.value
      .querySelector(`#verse-${selectedVerse.value.verseNumber}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

watch(selectedVerseJump, jumpToVerse);

// ── Lifecycle ─────────────────────────────────────────────────────────────────
let observer: IntersectionObserver | null = null;

onMounted(() => {
  scrollEl.value?.addEventListener("scroll", updateProgress);
  selectedVerseJump.value = surah.value?.verses[0]?.verseNumber;

  // Jump to specific verse if passed in query (e.g. ?verse=50)
  const queryVerse = route.query.verse;
  if (queryVerse) {
    const vNum = parseInt(queryVerse as string, 10);
    if (!isNaN(vNum)) {
      setTimeout(() => {
        jumpToVerse(vNum);
      }, 400);
    }
  }

  // Initialize IntersectionObserver to track visible verse and save as last read
  if (process.client && surah.value) {
    // Set initial last read for this surah
    setLastRead({
      surahNumber: surah.value.number,
      surahLatinName: surah.value.latinName,
      verseNumber: route.query.verse ? parseInt(route.query.verse as string, 10) : 1
    });

    observer = new IntersectionObserver((entries) => {
      const visible = entries.find(e => e.isIntersecting);
      if (visible) {
        const id = visible.target.id;
        const verseNum = parseInt(id.replace("verse-", ""), 10);
        if (!isNaN(verseNum) && surah.value) {
          setLastRead({
            surahNumber: surah.value.number,
            surahLatinName: surah.value.latinName,
            verseNumber: verseNum
          });
        }
      }
    }, {
      root: scrollEl.value,
      threshold: 0.4
    });

    // Observe all verses
    surah.value.verses.forEach((v) => {
      const el = document.getElementById(`verse-${v.verseNumber}`);
      if (el) observer?.observe(el);
    });
  }
});

onUnmounted(() => {
  scrollEl.value?.removeEventListener("scroll", updateProgress);
  if (observer) observer.disconnect();
});

// ── Surah navigation ──────────────────────────────────────────────────────────
const goToPrev = () => {
  const p = surah.value?.prevSurah?.number;
  if (p) router.push(`/surah/${p}`);
};
const goToNext = () => {
  const n = surah.value?.nextSurah?.number;
  if (n) router.push(`/surah/${n}`);
};
</script>

<template>
  <div
    class="fixed inset-0 flex flex-col overflow-hidden bg-app text-app font-quicksand"
  >
    <!-- Tafsir modal -->
    <AppModal
      :isOpen="isOpen"
      @closeModal="closeModal"
      :verse="modalVerse"
      :tafsir="tafsir"
      :surahName="surahNameModal"
    />

    <!-- ═══════════════════════════════════════════════════════
         MOBILE TOP BAR — hanya tampil di < lg
    ═══════════════════════════════════════════════════════ -->
    <div
      class="flex-shrink-0 lg:hidden flex items-center gap-2 px-4 py-3 border-b border-app bg-app/95 backdrop-blur-xl z-30"
    >
      <!-- Back to surah list -->
      <NuxtLink
        to="/surah"
        class="w-9 h-9 rounded-xl flex items-center justify-center text-app-muted hover:text-amber-400 hover:bg-amber-500/8 border border-app hover:border-amber-500/20 transition-all duration-200 flex-shrink-0"
        aria-label="Kembali ke daftar surah"
      >
        <Icon name="material-symbols:arrow-back-rounded" class="text-lg" />
      </NuxtLink>

      <!-- Surah name (center) -->
      <div class="flex-1 min-w-0 text-center">
        <p
          class="text-sm font-bold font-oleo text-fire-gradient truncate leading-tight"
        >
          {{ surah?.latinName }}
        </p>
        <p class="text-[10px] text-app-subtle font-opensans truncate">
          {{ surah?.meaning }} · {{ surah?.verseCount }} ayat
        </p>
      </div>

      <!-- Open surah list sidebar (mobile) -->
      <button
        @click="isMobileSidebarOpen = !isMobileSidebarOpen"
        class="w-9 h-9 rounded-xl flex items-center justify-center text-app-muted hover:text-amber-400 hover:bg-amber-500/8 border border-app hover:border-amber-500/20 transition-all duration-200 flex-shrink-0"
        :aria-label="isMobileSidebarOpen ? 'Tutup daftar' : 'Buka daftar surah'"
      >
        <Icon
          :name="
            isMobileSidebarOpen
              ? 'material-symbols:close-rounded'
              : 'material-symbols:list-rounded'
          "
          class="text-lg"
        />
      </button>

      <!-- Settings -->
      <button
        @click="toggleSettings"
        class="w-9 h-9 rounded-xl flex items-center justify-center text-app-muted hover:text-amber-400 hover:bg-amber-500/8 border border-app hover:border-amber-500/20 transition-all duration-200 flex-shrink-0"
        aria-label="Pengaturan"
      >
        <Icon name="material-symbols:tune-rounded" class="text-lg" />
      </button>
    </div>

    <!-- ═══════════════════════════════════════════════════════
         MAIN LAYOUT AREA (below mobile topbar)
    ═══════════════════════════════════════════════════════ -->
    <div class="flex flex-1 overflow-hidden">
      <!-- ══════════════════════════════════════════
           LEFT PANEL — Surah navigation list
      ══════════════════════════════════════════ -->

      <!-- Mobile sidebar overlay backdrop -->
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isMobileSidebarOpen"
          class="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          @click="isMobileSidebarOpen = false"
        />
      </Transition>

      <!-- Sidebar panel -->
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="-translate-x-full"
        leave-active-class="transition-transform duration-250 ease-in"
        leave-to-class="-translate-x-full"
      >
        <aside
          v-show="isMobileSidebarOpen"
          class="fixed left-0 top-0 bottom-0 z-30 w-72 flex flex-col border-r border-app bg-app shadow-2xl shadow-black/30 lg:hidden"
        >
          <!-- Close button inside sidebar -->
          <div
            class="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0"
          >
            <p
              class="text-xs uppercase tracking-widest text-amber-500/70 font-opensans"
            >
              Daftar Surah
            </p>
            <button
              @click="isMobileSidebarOpen = false"
              class="w-7 h-7 rounded-lg flex items-center justify-center text-app-muted hover:text-app hover:bg-app-card transition-all"
            >
              <Icon name="material-symbols:close-rounded" class="text-base" />
            </button>
          </div>
          <SurahNavigation @navigate="isMobileSidebarOpen = false" />
        </aside>
      </Transition>

      <!-- Desktop sidebar (always visible ≥ lg) -->
      <aside
        class="flex-shrink-0 w-72 hidden lg:flex flex-col border-r border-app bg-app"
      >
        <SurahNavigation />
      </aside>

      <!-- ══════════════════════════════════════════
           MAIN CONTENT — Verse reader
      ══════════════════════════════════════════ -->
      <main class="flex-1 flex flex-col overflow-hidden min-w-0">
        <!-- ── Desktop surah header (hidden on mobile — topbar replaces it) ── -->
        <div
          class="hidden lg:block flex-shrink-0 px-6 pt-6 pb-4 border-b border-app"
        >
          <div class="flex items-center justify-between mb-3">
            <!-- Prev -->
            <button
              @click="goToPrev"
              :disabled="!surah?.prevSurah"
              class="flex items-center gap-1.5 text-xs text-app-muted hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 group"
            >
              <Icon
                name="material-symbols:chevron-left-rounded"
                class="text-lg group-hover:-translate-x-0.5 transition-transform"
              />
              <span class="hidden xl:inline">{{
                surah?.prevSurah?.latinName
              }}</span>
            </button>

            <!-- Surah name -->
            <div class="text-center">
              <div class="flex items-center justify-center gap-4">
                <h1
                  class="text-2xl xl:text-3xl font-bold font-oleo text-fire-gradient"
                >
                  {{ surah?.latinName }}
                </h1>
                <span class="text-app-subtle hidden xl:block">–</span>
                <h2
                  class="text-2xl xl:text-3xl font-bold font-lpmq text-amber-600 dark:text-amber-200"
                  style="direction: rtl"
                >
                  {{ surah?.name }}
                </h2>
              </div>
              <p class="text-xs text-app-muted mt-1 font-opensans">
                {{ surah?.meaning }} · {{ surah?.verseCount }} ayat ·
                {{ surah?.revelationPlace }}
              </p>
            </div>

            <!-- Next -->
            <button
              @click="goToNext"
              :disabled="!surah?.nextSurah"
              class="flex items-center gap-1.5 text-xs text-app-muted hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 group"
            >
              <span class="hidden xl:inline">{{
                surah?.nextSurah?.latinName
              }}</span>
              <Icon
                name="material-symbols:chevron-right-rounded"
                class="text-lg group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>

          <!-- Read progress bar -->
          <div
            class="h-1 w-full bg-app-card rounded-full overflow-hidden"
          >
            <div
              class="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-full transition-all duration-300"
              :style="{ width: readProgress + '%' }"
            />
          </div>
          <p class="text-[10px] text-app-subtle mt-1 text-right font-opensans">
            {{ readProgress }}% dibaca
          </p>
        </div>

        <!-- Mobile progress bar (slim, below topbar) -->
        <div class="lg:hidden h-0.5 w-full bg-app-card flex-shrink-0">
          <div
            class="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
            :style="{ width: readProgress + '%' }"
          />
        </div>

        <!-- ── Bismillah ── -->
        <div
          v-if="surah?.number !== 1 && surah?.number !== 9"
          class="flex-shrink-0 text-center py-3 lg:py-4 border-b border-app"
        >
          <p
            class="text-xl lg:text-2xl font-lpmq text-amber-500/80 tracking-wider"
            style="direction: rtl"
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>

        <!-- ── Verses ── -->
        <div
          ref="scrollEl"
          class="flex-1 overflow-y-auto scrollbar-gold px-3 sm:px-4 py-3 lg:py-4"
          :class="isPlaying || isPaused ? 'pb-28' : 'pb-4'"
        >
          <div
            v-for="verse in surah?.verses"
            :id="'verse-' + verse.verseNumber"
            :key="verse.verseNumber"
            :class="[
              'group relative rounded-2xl mb-3 transition-all duration-300 border',
              selectedVerse?.verseNumber === verse.verseNumber
                ? 'verse-active pulse-gold'
                : 'border-transparent hover:border-app hover:bg-app-card',
            ]"
          >
            <div class="flex gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5">
              <SurahAction :verse="verse" :showModal="() => showModal(verse)" />

              <div class="flex-1 min-w-0" style="direction: rtl">
                <div class="flex items-start justify-between gap-3 mb-4">
                  <p
                    class="arabic-text text-xl sm:text-2xl lg:text-3xl leading-loose flex-1"
                    :class="
                      selectedVerse?.verseNumber === verse.verseNumber
                        ? 'text-amber-950 dark:text-amber-100'
                        : 'text-app'
                    "
                  >
                    {{ verse.arabicText }}
                  </p>
                  <div class="verse-badge mt-2 flex-shrink-0">
                    {{ verse.verseNumber }}
                  </div>
                </div>
                <div style="direction: ltr" class="space-y-1.5">
                  <p
                    class="text-xs sm:text-sm font-opensans italic text-fire-gradient leading-relaxed"
                  >
                    {{ verse.latinText }}
                  </p>
                  <p
                    class="text-xs sm:text-sm text-app-muted leading-relaxed font-opensans"
                  >
                    {{ verse.translation }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="h-4" />
        </div>
      </main>

      <!-- ══════════════════════════════════════════
           RIGHT PANEL — Settings sidebar (≥ xl)
      ══════════════════════════════════════════ -->
      <aside
        class="flex-shrink-0 w-64 hidden xl:flex flex-col border-l border-app bg-app"
      >
        <div
          class="flex flex-col h-full overflow-y-auto scrollbar-gold p-5 gap-6"
        >
          <NuxtLink to="/" class="block">
            <img
              :src="isDark ? '/dark-logo-1.svg' : '/light-logo-1.svg'"
              alt="Kalamullah"
              class="w-full h-14 object-contain"
              @error="
                (e) => ((e.target as HTMLImageElement).src = '/dark-logo-1.svg')
              "
            />
          </NuxtLink>

          <div
            class="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"
          />

          <!-- Pengaturan -->
          <section>
            <h3
              class="text-[11px] uppercase tracking-widest text-amber-500/70 font-opensans mb-4"
            >
              Pengaturan
            </h3>
            <div class="space-y-3">
              <div>
                <label class="text-xs text-app-muted font-opensans block mb-1.5"
                  >Lompat ke Ayat</label
                >
                <USelect
                  placeholder="Pilih Ayat"
                  v-model="selectedVerseJump"
                  size="md"
                  :options="verseOptions"
                  class="w-full"
                />
              </div>
              <div>
                <label class="text-xs text-app-muted font-opensans block mb-1.5"
                  >Qori</label
                >
                <USelect
                  placeholder="Pilih Qori"
                  :model-value="qori"
                  @update:model-value="changeQori"
                  size="md"
                  :options="[
                    { label: 'Abdullah Al Juhany', value: '01' },
                    { label: 'Abdul Muhsin Al Qosim', value: '02' },
                    { label: 'Abdurrahman As Sudais', value: '03' },
                    { label: 'Ibrahim Al Dossari', value: '04' },
                    { label: 'Misyari Rasyid Al Afasi', value: '05' },
                  ]"
                  class="w-full"
                />
              </div>
            </div>
          </section>

          <div
            class="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"
          />

          <!-- Navigasi Surah -->
          <section>
            <h3
              class="text-[11px] uppercase tracking-widest text-amber-500/70 font-opensans mb-4"
            >
              Navigasi Surah
            </h3>
            <div class="space-y-2">
              <button
                @click="goToPrev"
                :disabled="!surah?.prevSurah"
                class="w-full flex items-center gap-3 p-3 rounded-xl border border-app bg-app-card hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-left group"
              >
                <Icon
                  name="material-symbols:chevron-left-rounded"
                  class="text-amber-500 text-lg flex-shrink-0"
                />
                <div class="min-w-0">
                  <p class="text-[10px] text-app-subtle font-opensans">
                    Sebelumnya
                  </p>
                  <p class="text-sm text-app font-medium truncate">
                    {{ surah?.prevSurah?.latinName ?? "–" }}
                  </p>
                </div>
              </button>
              <button
                @click="goToNext"
                :disabled="!surah?.nextSurah"
                class="w-full flex items-center gap-3 p-3 rounded-xl border border-app bg-app-card hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-left group"
              >
                <Icon
                  name="material-symbols:chevron-right-rounded"
                  class="text-amber-500 text-lg flex-shrink-0"
                />
                <div class="min-w-0">
                  <p class="text-[10px] text-app-subtle font-opensans">
                    Selanjutnya
                  </p>
                  <p class="text-sm text-app font-medium truncate">
                    {{ surah?.nextSurah?.latinName ?? "–" }}
                  </p>
                </div>
              </button>
            </div>
          </section>

          <div
            class="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"
          />

          <!-- Quick nav -->
          <section>
            <h3
              class="text-[11px] uppercase tracking-widest text-amber-500/70 font-opensans mb-4"
            >
              Menu
            </h3>
            <nav class="space-y-1">
              <NuxtLink
                v-for="link in [
                  {
                    to: '/',
                    label: 'Home',
                    icon: 'material-symbols:home-rounded',
                  },
                  {
                    to: '/surah',
                    label: 'Surah',
                    icon: 'material-symbols:menu-book-rounded',
                  },
                  {
                    to: '/tafsir',
                    label: 'Tafsir',
                    icon: 'material-symbols:auto-stories-rounded',
                  },
                ]"
                :key="link.to"
                :to="link.to"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-app-muted hover:text-amber-400 hover:bg-amber-500/5 transition-all duration-200 text-sm"
              >
                <Icon :name="link.icon" class="text-base flex-shrink-0" />
                {{ link.label }}
              </NuxtLink>
            </nav>
          </section>

          <div class="flex-1" />

          <!-- Settings button -->
          <button
            @click="toggleSettings"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-app bg-app-card hover:border-amber-500/25 hover:bg-amber-500/5 transition-all duration-200 text-sm text-app-muted hover:text-amber-400"
          >
            <Icon name="material-symbols:tune-rounded" class="text-base" />
            Pengaturan & Tema
          </button>

          <footer class="border-t border-app pt-4">
            <p class="text-center text-app-subtle text-[10px] font-opensans">
              &copy; {{ new Date().getFullYear() }} Kalamullah
            </p>
          </footer>
        </div>
      </aside>
    </div>
    <!-- end flex main layout -->

    <!-- Floating audio player -->
    <AppAudioPlayer />
  </div>
</template>
