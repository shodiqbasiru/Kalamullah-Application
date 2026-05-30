<script lang="ts" setup>
useHead({
  title: "Kalamullah | Daftar Surah",
  meta: [{ name: "description", content: "Daftar 114 surah Al-Qur'an." }],
});

const {
  computed: { filteredSurah },
  methods: { getAllSurah, handleSearch },
} = useSurahData();

getAllSurah();
const { lastRead } = useLastRead();
</script>

<template>
  <div>
    <PageContainer class="min-h-[calc(80vh-4rem)] pb-24">
      <!-- ── Last Read Card ── -->
      <div class="max-w-md mx-auto mt-10 mb-12">
        <NuxtLink
          :to="`/surah/${lastRead.surahNumber}?verse=${lastRead.verseNumber}`"
          class="group block relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 p-px"
        >
          <!-- Solid bg-app-card prevents any text color clashing in light/dark mode -->
          <div class="rounded-2xl bg-app-card overflow-hidden">
            <div class="flex items-center justify-between px-6 py-5">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <Icon
                    name="material-symbols:history-rounded"
                    class="text-amber-500 dark:text-amber-400 text-sm"
                  />
                  <span
                    class="text-[11px] text-app-muted uppercase tracking-widest font-opensans"
                    >Terakhir Dibaca</span
                  >
                </div>
                <p class="text-2xl font-bold font-oleo text-fire-gradient">
                  {{ lastRead.surahLatinName }}
                </p>
                <p class="text-xs text-app-muted mt-0.5 font-opensans">Ayat ke-{{ lastRead.verseNumber }} • Surah ke-{{ lastRead.surahNumber }}</p>
              </div>
              <img
                src="~/assets/images/quran-kal.png"
                alt="Qur'an"
                class="w-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 animate-float"
              />
            </div>
            <div class="h-0.5 w-full bg-app/50">
              <div
                class="h-0.5 bg-gradient-to-r from-amber-500 to-orange-600"
                style="width: 100%"
              />
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- ── Header + Search ── -->
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 px-1"
      >
        <div>
          <h2 class="text-3xl font-bold font-oleo text-fire-gradient">
            Daftar Surah
          </h2>
          <p class="text-xs text-app-subtle mt-1 font-opensans">
            {{ filteredSurah.length }} surah ditemukan
          </p>
        </div>

        <!-- Search bar -->
        <div class="relative flex-shrink-0 w-full sm:w-72">
          <div
            class="absolute inset-y-0 left-3 flex items-center pointer-events-none"
          >
            <Icon
              name="material-symbols:search"
              class="text-app-subtle text-lg"
            />
          </div>
          <input
            type="text"
            @input="handleSearch"
            placeholder="Cari surah..."
            class="w-full pl-10 pr-4 py-2.5 bg-app-card border border-app rounded-xl text-sm text-app placeholder-app-subtle focus:outline-none focus:border-amber-500/60 transition-all duration-200 font-quicksand"
          />
        </div>
      </div>

      <!-- ── Surah Grid ── -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        style="direction: rtl"
      >
        <SurahCard :surah="filteredSurah" />
      </div>

      <!-- ── Empty State ── -->
      <div v-if="filteredSurah.length === 0" class="text-center py-20">
        <Icon
          name="material-symbols:search-off-rounded"
          class="text-5xl text-app-subtle mb-4"
        />
        <p class="text-app-muted font-opensans">Surah tidak ditemukan</p>
        <p class="text-xs text-app-subtle mt-1">Coba dengan kata kunci berbeda</p>
      </div>
    </PageContainer>
  </div>
</template>
