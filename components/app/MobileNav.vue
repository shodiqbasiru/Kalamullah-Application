<script lang="ts" setup>
/**
 * AppMobileNav — Bottom navigation bar untuk mobile.
 * Hanya tampil di layar < lg dan di luar halaman surah reader
 * (yang punya fixed layout sendiri).
 */
const route = useRoute();
const { toggleSettings } = useAppSettings();
const {
  data: { isPlaying, isPaused },
} = useAudioPlayer();

const isReaderPage = computed(() => /^\/surah\/\d+/.test(route.path));

const navLinks = [
  {
    to: "/",
    label: "Home",
    icon: "material-symbols:home-rounded",
    activeIcon: "material-symbols:home-filled",
  },
  {
    to: "/surah",
    label: "Surah",
    icon: "material-symbols:menu-book-outline",
    activeIcon: "material-symbols:menu-book-rounded",
  },
  {
    to: "/tafsir",
    label: "Tafsir",
    icon: "material-symbols:auto-stories-outline",
    activeIcon: "material-symbols:auto-stories-rounded",
  },
  {
    to: "/doa",
    label: "Doa",
    icon: "material-symbols:favorite-outline",
    activeIcon: "material-symbols:favorite-rounded",
  },
  {
    to: "/hadist",
    label: "Hadist",
    icon: "material-symbols:library-books-outline",
    activeIcon: "material-symbols:library-books-rounded",
  },
];

const isActive = (path: string) => {
  if (path === "/") return route.path === "/";
  return route.path.startsWith(path);
};
</script>

<template>
  <!-- Only visible on mobile, and not on full-screen reader -->
  <div
    v-if="!isReaderPage"
    class="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
    :class="isPlaying || isPaused ? 'bottom-[4.5rem]' : 'bottom-0'"
  >
    <!-- Top border glow -->
    <div
      class="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
    />

    <nav class="bg-app/95 backdrop-blur-xl border-t border-app">
      <div class="flex items-stretch">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-1 transition-all duration-200 relative"
          :class="
            isActive(link.to)
              ? 'text-amber-500'
              : 'text-app-muted hover:text-app-subtle'
          "
        >
          <!-- Active indicator line at top -->
          <div
            v-if="isActive(link.to)"
            class="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
          />

          <Icon
            :name="isActive(link.to) ? link.activeIcon : link.icon"
            class="text-xl"
            :class="isActive(link.to) ? 'scale-110' : ''"
          />
          <span class="text-[10px] font-medium font-quicksand leading-none">
            {{ link.label }}
          </span>
        </NuxtLink>

        <!-- Settings button -->
        <button
          @click="toggleSettings"
          class="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-1 text-app-muted hover:text-app-subtle transition-all duration-200"
        >
          <Icon name="material-symbols:tune-rounded" class="text-xl" />
          <span class="text-[10px] font-medium font-quicksand leading-none"
            >Setelan</span
          >
        </button>
      </div>
    </nav>

    <!-- iPhone home indicator safe area -->
    <div class="h-safe-area-inset-bottom bg-app/95" />
  </div>
</template>
