<script lang="ts" setup></script>

<template>
  <div
    class="min-h-screen bg-gray-50 text-gray-950 dark:bg-black dark:text-gray-50 flex flex-col relative"
  >
    <div class="flex flex-col">
      <LayoutHeader />
      <!-- main -->
      <main class="flex-1 relative p-4 dark:bg-gray-900 dark:text-gray-50">
        <slot />
      </main>
    </div>
  </div>
</template>
