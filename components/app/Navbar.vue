<script lang="ts" setup>
/**
 * AppNavbar — Top navigation bar untuk halaman non-reader.
 * Berisi: logo, link navigasi desktop, tombol theme toggle & pengaturan.
 * Ditampilkan di semua halaman dengan default layout.
 */
const route = useRoute();
const { toggleSettings } = useAppSettings();
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

const navLinks = [
  {
    to: "/",
    label: "Beranda",
    icon: "material-symbols:home-rounded",
  },
  {
    to: "/surah",
    label: "Surah",
    icon: "material-symbols:menu-book-rounded",
  },
  {
    to: "/tafsir",
    label: "Tafsir",
    icon: "material-symbols:auto-stories-rounded",
  },
  {
    to: "/doa",
    label: "Doa",
    icon: "material-symbols:volunteer-activism-rounded",
  },
  {
    to: "/hadist",
    label: "Hadist",
    icon: "material-symbols:library-books-rounded",
  },
];

const isActive = (path: string) => {
  if (path === "/") return route.path === "/";
  return route.path.startsWith(path);
};

// Scroll-aware: navbar slightly elevated when scrolled
const isScrolled = ref(false);
onMounted(() => {
  const onScroll = () => {
    isScrolled.value = window.scrollY > 8;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onUnmounted(() => window.removeEventListener("scroll", onScroll));
});
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-40 w-full transition-all duration-300',
      isScrolled
        ? 'bg-app/95 backdrop-blur-xl border-b border-app shadow-sm'
        : 'bg-transparent border-b border-transparent',
    ]"
  >
    <!-- Top gold line (subtle) -->
    <div
      v-if="isScrolled"
      class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
    />

    <PageContainer>
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="group flex items-center gap-2 flex-shrink-0">
          <div
            class="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform duration-200"
          >
            <Icon
              name="material-symbols:menu-book-rounded"
              class="text-sm text-white"
            />
          </div>
          <span
            class="text-base font-bold font-oleo text-fire-gradient group-hover:opacity-90 transition-opacity"
          >
            Kalamullah
          </span>
        </NuxtLink>

        <!-- Desktop nav links -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :class="[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium font-quicksand transition-all duration-200',
              isActive(link.to)
                ? 'text-amber-500 bg-amber-500/10'
                : 'text-app-muted hover:text-app hover:bg-app-card',
            ]"
          >
            <Icon :name="link.icon" class="text-base" />
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Right actions -->
        <div class="flex items-center gap-2">
          <!-- Theme toggle -->
          <button
            @click="colorMode.preference = isDark ? 'light' : 'dark'"
            class="w-8 h-8 rounded-xl flex items-center justify-center text-app-muted hover:text-amber-500 hover:bg-amber-500/10 transition-all duration-200"
            :title="isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'"
          >
            <Icon
              :name="
                isDark
                  ? 'material-symbols:light-mode-rounded'
                  : 'material-symbols:dark-mode-rounded'
              "
              class="text-lg"
            />
          </button>

          <!-- Settings button -->
          <button
            @click="toggleSettings"
            class="w-8 h-8 rounded-xl flex items-center justify-center text-app-muted hover:text-amber-500 hover:bg-amber-500/10 transition-all duration-200"
            title="Pengaturan"
            aria-label="Buka pengaturan"
          >
            <Icon name="material-symbols:tune-rounded" class="text-lg" />
          </button>
        </div>
      </div>
    </PageContainer>
  </header>
</template>
