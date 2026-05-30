<script lang="ts" setup></script>

<template>
  <footer class="relative border-t border-app mt-auto">
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent"
    />
    <PageContainer>
      <div
        class="py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <div class="flex items-center gap-3">
          <p class="text-xs text-app-subtle font-quicksand">
            Al-Qur'an Digital
          </p>
        </div>
        <p class="text-amber-600/40 text-sm font-lpmq" style="direction: rtl">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <p class="text-xs text-app-subtle">
          &copy; {{ new Date().getFullYear() }} Kalamullah
        </p>
      </div>
    </PageContainer>
  </footer>
</template>
