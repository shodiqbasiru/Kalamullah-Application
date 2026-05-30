<script lang="ts" setup></script>

<template>
  <div
    class="min-h-screen bg-app text-app flex flex-col font-quicksand pattern-islamic"
  >
    <!-- Ambient glow background -->
    <div
      class="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        class="absolute top-0 left-1/4 w-96 h-96 bg-app-glow-1 rounded-full blur-3xl"
      />
      <div
        class="absolute top-1/3 right-1/4 w-64 h-64 bg-app-glow-2 rounded-full blur-3xl"
      />
      <div
        class="absolute bottom-1/4 left-1/3 w-80 h-80 bg-app-glow-3 rounded-full blur-3xl"
      />
    </div>

    <div class="relative flex flex-col flex-1 z-10">
      <!-- Desktop/top navbar -->
      <AppNavbar />

      <main class="flex-1 relative">
        <slot />
      </main>

      <LayoutFooter />
    </div>

    <!-- Floating audio player — tersedia di semua halaman dengan default layout -->
    <AppAudioPlayer />

    <!-- Mobile bottom navigation -->
    <AppMobileNav />

    <!-- Settings panel -->
    <AppSettings />
  </div>
</template>
