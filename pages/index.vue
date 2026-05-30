<script lang="ts" setup>
import Quran from "~/assets/images/quran.png";
import Tafsir from "~/assets/images/tafsir.png";
import Praying from "~/assets/images/praying.png";
import Hadist from "~/assets/images/hadist.png";

useHead({
  title: "Kalamullah | Al-Qur'an Digital",
  meta: [
    {
      name: "description",
      content: "Baca Al-Qur'an, Tafsir, Doa, dan Hadist secara digital.",
    },
  ],
});

const { lastRead } = useLastRead();

const dataNavigation = [
  {
    name: "Surah",
    description: "114 surah Al-Qur'an lengkap beserta terjemahan",
    image: Quran,
    route: "/surah",
    icon: "material-symbols:menu-book-rounded",
    color: "from-amber-500/20 to-yellow-600/10",
    border: "border-amber-500/30",
    badge: "114 Surah",
  },
  {
    name: "Tafsir",
    description: "Penjelasan mendalam makna ayat Al-Qur'an",
    image: Tafsir,
    route: "/tafsir",
    icon: "material-symbols:auto-stories-rounded",
    color: "from-orange-500/20 to-amber-600/10",
    border: "border-orange-500/30",
    badge: "Segera Hadir",
  },
  {
    name: "Doa",
    description: "Kumpulan doa harian dari Al-Qur'an & Hadist",
    image: Praying,
    route: "/doa",
    icon: "material-symbols:volunteer-activism-rounded",
    color: "from-yellow-500/20 to-amber-500/10",
    border: "border-yellow-500/30",
    badge: "Segera Hadir",
  },
  {
    name: "Hadist",
    description: "Kumpulan hadist shahih pilihan",
    image: Hadist,
    route: "/hadist",
    icon: "material-symbols:library-books-rounded",
    color: "from-red-500/20 to-orange-600/10",
    border: "border-red-500/30",
    badge: "Segera Hadir",
  },
];
</script>

<template>
  <div>
    <PageContainer class="min-h-[calc(100vh-5rem)] pb-24">
      <!-- ── Hero Section ── -->
      <div class="relative text-center pt-16 pb-12">
        <!-- Decorative radial glow -->
        <div
          class="absolute inset-0 -z-10 pointer-events-none"
          aria-hidden="true"
        >
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/8 rounded-full blur-3xl"
          />
        </div>

        <!-- Ornament line -->
        <div class="ornament-line max-w-xs mx-auto mb-6">
          <span
            class="text-xs text-amber-500/60 tracking-[0.3em] uppercase font-opensans"
          >
            Kalamullah
          </span>
        </div>

        <h1
          class="text-5xl sm:text-6xl font-bold font-oleo text-fire-gradient mb-4 leading-tight"
        >
          Al-Qur'an Digital
        </h1>

        <p
          class="text-lg text-amber-600/80 dark:text-amber-200/70 font-lpmq tracking-wide mb-2"
          style="direction: rtl"
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        <!-- Hadith quote -->
        <div
          class="max-w-2xl mx-auto mt-8 px-6 py-5 rounded-2xl border border-amber-500/15 bg-amber-500/5"
        >
          <p
            class="text-sm sm:text-base text-app-muted leading-relaxed font-opensans"
          >
            Barangsiapa yang membaca satu huruf al-Qur'an maka baginya satu
            kebaikan dan satu kebaikan dibalas sepuluh kebaikan, aku tidak
            mengatakan satu huruf, tetapi alif satu huruf, lam satu huruf dan
            mim satu huruf.
          </p>
          <p class="text-xs text-amber-500/60 mt-3 font-quicksand italic">
            HR. At-Tirmidzi (2910) — Hasan Shahih
          </p>
        </div>
      </div>

      <!-- ── Last Read Card ── -->
      <div class="max-w-lg mx-auto mb-16">
        <NuxtLink
          :to="`/surah/${lastRead.surahNumber}?verse=${lastRead.verseNumber}`"
          class="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 p-px"
        >
          <!-- Inner card — solid bg-app-card prevents any text color clashing in light/dark mode -->
          <div
            class="relative rounded-3xl bg-app-card overflow-hidden"
          >
            <!-- Gold shimmer overlay on hover -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <div class="flex items-center justify-between p-6 sm:p-8">
              <div class="space-y-1">
                <div class="flex items-center gap-2 mb-3">
                  <Icon
                    name="material-symbols:history-rounded"
                    class="text-amber-500 dark:text-amber-400 text-base"
                  />
                  <span
                    class="text-xs text-app-muted uppercase tracking-widest font-opensans"
                  >
                    Terakhir Dibaca
                  </span>
                </div>
                <p class="text-3xl font-bold font-oleo text-fire-gradient">
                  {{ lastRead.surahLatinName }}
                </p>
                <p class="text-sm text-app-muted font-opensans">Ayat ke-{{ lastRead.verseNumber }} • Surah ke-{{ lastRead.surahNumber }}</p>
                <div
                  class="mt-4 flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm font-medium group-hover:gap-3 transition-all duration-300"
                >
                  <span>Lanjutkan membaca</span>
                  <Icon name="material-symbols:arrow-forward-rounded" />
                </div>
              </div>

              <div class="relative">
                <div
                  class="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full group-hover:bg-amber-500/30 transition-all duration-500"
                />
                <img
                  src="~/assets/images/quran-kal.png"
                  alt="Al-Qur'an"
                  class="relative w-28 sm:w-36 object-contain drop-shadow-2xl animate-float"
                />
              </div>
            </div>

            <!-- Progress bar at bottom -->
            <div class="h-1 w-full bg-app/50">
              <div
                class="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-full"
                style="width: 100%"
              />
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- ── Navigation Cards ── -->
      <div>
        <div class="ornament-line max-w-xs mx-auto mb-10">
          <span
            class="text-xs text-amber-500/60 tracking-[0.3em] uppercase font-opensans"
          >
            Fitur Utama
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <NuxtLink
            v-for="(nav, index) in dataNavigation"
            :key="index"
            :to="nav.route"
            :class="[
              'group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300',
              'bg-gradient-to-br',
              nav.color,
              nav.border,
              'hover:shadow-lg hover:shadow-amber-900/20 hover:-translate-y-1',
              'animate-fade-in-up',
            ]"
            :style="{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both',
            }"
          >
            <!-- Badge -->
             <div class="absolute top-4 right-4">
              <span
                class="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 dark:border-amber-500/30 font-opensans tracking-wide uppercase"
              >
                {{ nav.badge }}
              </span>
            </div>

            <!-- Corner decoration -->
            <div
              class="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-amber-500/5 to-transparent rounded-tl-full"
            />

            <!-- Content -->
            <div class="flex items-start gap-4">
               <div
                class="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              >
                <Icon :name="nav.icon" class="text-2xl text-amber-600 dark:text-amber-400" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-xl font-bold font-oleo text-fire-gradient mb-1">
                  {{ nav.name }}
                </h3>
                <p class="text-xs text-app-subtle leading-relaxed font-opensans">
                  {{ nav.description }}
                </p>
              </div>
            </div>

            <!-- Image subtle -->
            <div
              class="mt-4 flex justify-end opacity-30 group-hover:opacity-50 transition-opacity duration-300"
            >
              <img
                :src="nav.image"
                :alt="nav.name"
                class="h-12 object-contain"
              />
            </div>

            <!-- Arrow -->
             <div
              class="absolute bottom-4 right-4 text-amber-500/40 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300"
            >
              <Icon
                name="material-symbols:arrow-forward-ios-rounded"
                class="text-sm"
              />
            </div>
          </NuxtLink>
        </div>
      </div>
    </PageContainer>
  </div>
</template>
