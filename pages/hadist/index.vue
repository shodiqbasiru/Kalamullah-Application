<script lang="ts" setup>
useHead({ title: "Kalamullah | Hadist" });
</script>

<template>
  <div>
    <PageContainer>
      <div
        class="min-h-[70vh] flex flex-col items-center justify-center gap-8 py-24"
      >
        <div class="relative">
          <div class="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full" />
          <div
            class="relative w-24 h-24 rounded-3xl border border-amber-500/20 bg-amber-500/10 flex items-center justify-center"
          >
            <Icon
              name="material-symbols:library-books-rounded"
              class="text-5xl text-amber-500 dark:text-amber-400"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-900/30"
          >
            <Icon
              name="material-symbols:menu-book-rounded"
              class="text-sm text-white"
            />
          </div>
          <span class="text-base font-bold font-oleo text-fire-gradient">
            Kalamullah
          </span>
        </div>
        <div class="text-center space-y-3 max-w-md">
          <h1 class="text-3xl font-bold font-oleo text-fire-gradient">
            Kumpulan Hadist
          </h1>
          <p class="text-app-muted font-opensans text-sm">
            Koleksi hadist shahih pilihan akan segera tersedia di sini.
          </p>
        </div>
        <div
          class="flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-500/25 bg-amber-500/8"
        >
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span class="text-sm text-amber-600 dark:text-amber-400 font-opensans">Segera Hadir</span>
        </div>
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-sm text-app-muted hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 group"
        >
          <Icon
            name="material-symbols:arrow-back-rounded"
            class="group-hover:-translate-x-0.5 transition-transform"
          />
          Kembali ke Beranda
        </NuxtLink>
      </div>
    </PageContainer>
  </div>
</template>
