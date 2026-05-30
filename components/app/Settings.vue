<script lang="ts" setup>
/**
 * AppSettings — Slide-in settings panel dari kanan.
 * Berisi: theme toggle, navigasi shortcut, qori selector, info app.
 * Bisa dibuka dari mana saja via useAppSettings().
 */

const { isSettingsOpen, closeSettings } = useAppSettings();
const colorMode = useColorMode();

const {
  data: { qori, selectedVerse, isPlaying },
  methods: { changeQori },
} = useAudioPlayer();

const isDark = computed({
  get: () => colorMode.value === "dark",
  set: (v) => {
    colorMode.preference = v ? "dark" : "light";
  },
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
};

const qoriOptions = [
  { label: "Abdullah Al Juhany", value: "01", short: "Al Juhany" },
  { label: "Abdul Muhsin Al Qosim", value: "02", short: "Al Qosim" },
  { label: "Abdurrahman As Sudais", value: "03", short: "As Sudais" },
  { label: "Ibrahim Al Dossari", value: "04", short: "Al Dossari" },
  { label: "Misyari Rasyid Al Afasi", value: "05", short: "Al Afasi" },
];

const navLinks = [
  {
    to: "/",
    label: "Beranda",
    icon: "material-symbols:home-rounded",
    desc: "Halaman utama",
  },
  {
    to: "/surah",
    label: "Surah",
    icon: "material-symbols:menu-book-rounded",
    desc: "114 surah Al-Qur'an",
  },
  {
    to: "/tafsir",
    label: "Tafsir",
    icon: "material-symbols:auto-stories-rounded",
    desc: "Tafsir Al-Qur'an",
  },
  {
    to: "/doa",
    label: "Doa",
    icon: "material-symbols:volunteer-activism-rounded",
    desc: "Kumpulan doa",
  },
  {
    to: "/hadist",
    label: "Hadist",
    icon: "material-symbols:library-books-rounded",
    desc: "Hadist shahih",
  },
];

// Trap focus & close on Escape
onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isSettingsOpen.value) closeSettings();
  };
  window.addEventListener("keydown", onKey);
  onUnmounted(() => window.removeEventListener("keydown", onKey));
});
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-300"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isSettingsOpen"
        class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        @click="closeSettings"
        aria-hidden="true"
      />
    </Transition>

    <!-- Panel -->
    <Transition
      enter-active-class="transition-transform transition-opacity duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      leave-active-class="transition-transform transition-opacity duration-300 ease-in"
      leave-to-class="translate-x-full opacity-0"
    >
      <aside
        v-if="isSettingsOpen"
        class="fixed right-0 top-0 bottom-0 z-[61] w-80 sm:w-96 flex flex-col overflow-hidden bg-app border-l border-app shadow-2xl shadow-black/40"
        role="dialog"
        aria-label="Pengaturan"
      >
        <!-- Top gold line -->
        <div
          class="h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent flex-shrink-0"
        />

        <!-- Header -->
        <div
          class="flex items-center justify-between px-6 py-5 border-b border-app flex-shrink-0"
        >
          <div>
            <h2 class="text-base font-bold text-app font-quicksand">
              Pengaturan
            </h2>
            <p class="text-xs text-app-subtle font-opensans mt-0.5">
              Sesuaikan preferensi Anda
            </p>
          </div>
          <button
            @click="closeSettings"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-app-muted hover:text-app hover:bg-app-card border border-transparent hover:border-app transition-all duration-150"
            aria-label="Tutup pengaturan"
          >
            <Icon name="material-symbols:close-rounded" class="text-lg" />
          </button>
        </div>

        <!-- Scrollable content -->
        <div class="flex-1 overflow-y-auto scrollbar-gold px-6 py-5 space-y-8">
          <!-- ── Theme toggle ── -->
          <section>
            <h3
              class="text-[11px] uppercase tracking-widest text-amber-500/70 font-opensans mb-4"
            >
              Tampilan
            </h3>

            <div
              class="flex items-center justify-between p-4 rounded-2xl border border-app bg-app-card"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"
                >
                  <Icon
                    :name="
                      isDark
                        ? 'material-symbols:dark-mode-rounded'
                        : 'material-symbols:light-mode-rounded'
                    "
                    class="text-lg text-amber-500"
                  />
                </div>
                <div>
                  <p class="text-sm font-medium text-app">Tema</p>
                  <p class="text-xs text-app-subtle font-opensans">
                    {{ isDark ? "Mode Gelap" : "Mode Terang" }}
                  </p>
                </div>
              </div>

              <!-- Toggle switch -->
              <button
                @click="toggleTheme"
                :class="[
                  'relative w-12 h-6 rounded-full border-2 transition-all duration-300',
                  isDark
                    ? 'bg-amber-500 border-amber-500'
                    : 'bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600',
                ]"
                :aria-label="
                  isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'
                "
              >
                <span
                  :class="[
                    'absolute top-0.5 w-4 h-4 rounded-full shadow-sm transition-all duration-300',
                    isDark
                      ? 'left-[calc(100%-1.125rem)] bg-white'
                      : 'left-0.5 bg-white',
                  ]"
                />
              </button>
            </div>

            <!-- Theme preview tiles -->
            <div class="grid grid-cols-2 gap-3 mt-3">
              <button
                @click="colorMode.preference = 'dark'"
                :class="[
                  'relative p-3 rounded-xl border-2 transition-all duration-200 text-left overflow-hidden',
                  isDark
                    ? 'border-amber-500 bg-gray-900'
                    : 'border-gray-200 bg-gray-100 hover:border-gray-300',
                ]"
              >
                <div
                  class="w-full h-8 rounded-lg bg-gray-950 mb-2 flex items-center px-2 gap-1.5"
                >
                  <div class="w-2 h-2 rounded-full bg-amber-500" />
                  <div class="flex-1 h-1 bg-gray-800 rounded" />
                </div>
                <p
                  class="text-xs font-medium"
                  :class="isDark ? 'text-amber-400' : 'text-gray-500'"
                >
                  Gelap
                </p>
                <Icon
                  v-if="isDark"
                  name="material-symbols:check-circle-rounded"
                  class="absolute top-2 right-2 text-amber-500 text-sm"
                />
              </button>
              <button
                @click="colorMode.preference = 'light'"
                :class="[
                  'relative p-3 rounded-xl border-2 transition-all duration-200 text-left overflow-hidden',
                  !isDark
                    ? 'border-amber-500 bg-white'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600',
                ]"
              >
                <div
                  class="w-full h-8 rounded-lg bg-stone-100 mb-2 flex items-center px-2 gap-1.5"
                >
                  <div class="w-2 h-2 rounded-full bg-amber-500" />
                  <div class="flex-1 h-1 bg-stone-300 rounded" />
                </div>
                <p
                  class="text-xs font-medium"
                  :class="!isDark ? 'text-amber-600' : 'text-gray-500'"
                >
                  Terang
                </p>
                <Icon
                  v-if="!isDark"
                  name="material-symbols:check-circle-rounded"
                  class="absolute top-2 right-2 text-amber-500 text-sm"
                />
              </button>
            </div>
          </section>

          <!-- ── Qori ── -->
          <section>
            <h3
              class="text-[11px] uppercase tracking-widest text-amber-500/70 font-opensans mb-4"
            >
              Qori Murottal
            </h3>
            <div class="space-y-2">
              <button
                v-for="opt in qoriOptions"
                :key="opt.value"
                @click="changeQori(opt.value)"
                :class="[
                  'w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left',
                  qori.value === opt.value
                    ? 'border-amber-500/50 bg-amber-500/8'
                    : 'border-app hover:border-amber-500/25 hover:bg-amber-500/4 bg-app-card',
                ]"
              >
                <!-- Radio dot -->
                <div
                  :class="[
                    'w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                    qori.value === opt.value
                      ? 'border-amber-500'
                      : 'border-app-muted',
                  ]"
                >
                  <div
                    v-if="qori.value === opt.value"
                    class="w-2 h-2 rounded-full bg-amber-500"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-app truncate">
                    {{ opt.label }}
                  </p>
                  <p
                    v-if="isPlaying && qori.value === opt.value"
                    class="text-[10px] text-amber-500 font-opensans"
                  >
                    Sedang diputar
                  </p>
                </div>
                <div
                  v-if="qori.value === opt.value"
                  class="flex items-end gap-px h-3 flex-shrink-0"
                >
                  <span
                    v-for="(h, i) in [4, 7, 5, 3]"
                    :key="i"
                    class="w-0.5 rounded-full bg-amber-500"
                    :class="
                      isPlaying
                        ? 'animate-[bounce_0.6s_ease-in-out_infinite]'
                        : 'opacity-40'
                    "
                    :style="{ height: h + 'px', animationDelay: i * 0.1 + 's' }"
                  />
                </div>
              </button>
            </div>
          </section>

          <!-- ── Navigation shortcuts ── -->
          <section>
            <h3
              class="text-[11px] uppercase tracking-widest text-amber-500/70 font-opensans mb-4"
            >
              Navigasi Cepat
            </h3>
            <nav class="space-y-1.5">
              <NuxtLink
                v-for="link in navLinks"
                :key="link.to"
                :to="link.to"
                @click="closeSettings"
                class="flex items-center gap-3 p-3 rounded-xl border border-app bg-app-card hover:border-amber-500/25 hover:bg-amber-500/4 transition-all duration-200 group"
              >
                <div
                  class="w-9 h-9 rounded-xl bg-amber-500/8 border border-amber-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/15 group-hover:border-amber-500/30 transition-all duration-200"
                >
                  <Icon :name="link.icon" class="text-base text-amber-500" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-app font-quicksand">
                    {{ link.label }}
                  </p>
                  <p class="text-xs text-app-subtle font-opensans">
                    {{ link.desc }}
                  </p>
                </div>
                <Icon
                  name="material-symbols:chevron-right-rounded"
                  class="text-app-subtle text-base flex-shrink-0 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all"
                />
              </NuxtLink>
            </nav>
          </section>

          <!-- ── Keyboard shortcuts ── -->
          <section>
            <h3
              class="text-[11px] uppercase tracking-widest text-amber-500/70 font-opensans mb-4"
            >
              Shortcut Keyboard
            </h3>
            <div class="space-y-2 text-sm">
              <div
                v-for="sc in [
                  { key: 'Space', desc: 'Play / Pause audio' },
                  { key: '→', desc: 'Ayat berikutnya' },
                  { key: '←', desc: 'Ayat sebelumnya' },
                  { key: 'Esc', desc: 'Tutup panel' },
                ]"
                :key="sc.key"
                class="flex items-center justify-between px-3 py-2 rounded-lg bg-app-card border border-app"
              >
                <span class="text-app-muted font-opensans text-xs">{{
                  sc.desc
                }}</span>
                <kbd
                  class="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold"
                >
                  {{ sc.key }}
                </kbd>
              </div>
            </div>
          </section>

          <!-- ── About ── -->
          <section class="pb-4">
            <div
              class="p-4 rounded-2xl border border-app bg-app-card text-center"
            >
              <p
                class="text-xs text-amber-500/80 font-lpmq text-lg mb-1"
                style="direction: rtl"
              >
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>
              <p class="text-xs text-app-subtle font-opensans mt-3">
                Kalamullah v1.0
              </p>
              <p class="text-[10px] text-app-subtle font-opensans mt-1">
                Al-Qur'an Digital
              </p>
            </div>
          </section>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>
