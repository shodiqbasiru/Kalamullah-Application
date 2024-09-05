<script lang="ts" setup></script>

<template>
  <div
    class="bg-gray-50 text-gray-950 dark:bg-black dark:text-gray-50 flex flex-col min-h-screen"
  >
    <div class="flex flex-col">
      <!-- <LayoutHeader /> -->
      <!-- main -->
      <main class="flex-1 relative">
        <slot />
      </main>

      <!-- <footer>
        <div class="bg-black text-white text-center py-4 relative">
          <p>&copy; 2024 Kalamullah</p>
        </div>
      </footer> -->
    </div>
  </div>
</template>
