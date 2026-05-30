<script lang="ts" setup></script>

<template>
  <div
    class="bg-app text-app flex flex-col min-h-screen font-quicksand pattern-islamic"
  >
    <!-- Ambient background -->
    <div
      class="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        class="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style="background: var(--glow-1)"
      />
      <div
        class="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl"
        style="background: var(--glow-2)"
      />
    </div>

    <main class="flex-1 relative z-10">
      <slot />
    </main>

    <!-- Global panels — rendered here for surah layout too -->
    <AppSettings />
  </div>
</template>
