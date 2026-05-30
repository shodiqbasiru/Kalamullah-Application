<script setup lang="ts">
import type { IVerse } from "~/models/data";

defineProps<{
  isOpen: boolean;
  verse: IVerse | undefined;
  tafsir: string | undefined;
  surahName: string | undefined;
}>();

const emit = defineEmits(["closeModal"]);
const handleClose = () => emit("closeModal");
</script>

<template>
  <UModal
    :model-value="isOpen"
    @update:model-value="(v) => !v && handleClose()"
  >
    <UCard
      :ui="{
        ring: '',
        base: 'bg-app border border-amber-500/20',
        divide: 'divide-y divide-app',
        header: { padding: 'px-6 py-4' },
        body: { padding: 'px-6 py-0' },
      }"
    >
      <!-- Modal header -->
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-[10px] text-amber-500/60 uppercase tracking-widest font-opensans mb-0.5"
            >
              Tafsir
            </p>
            <h3 class="text-lg font-bold font-oleo text-fire-gradient">
              {{ surahName }} · Ayat {{ verse?.verseNumber }}
            </h3>
          </div>
          <button
            @click="handleClose"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-app-subtle hover:text-app hover:bg-app-card transition-all duration-200"
          >
            <Icon name="material-symbols:close-rounded" class="text-lg" />
          </button>
        </div>
      </template>

      <!-- Modal body -->
      <div class="py-6 scrollbar-gold overflow-y-auto max-h-[calc(75vh-6rem)]">
        <div class="space-y-6">
          <!-- Arabic text -->
          <div
            class="rounded-2xl border border-amber-500/15 bg-amber-500/5 p-5"
          >
            <p
              class="arabic-text text-2xl text-amber-600/90 dark:text-amber-500/90 leading-loose text-right"
              style="direction: rtl"
            >
              {{ verse?.arabicText }}
            </p>
          </div>

          <!-- Latin -->
          <div>
            <p
              class="text-sm font-opensans italic text-fire-gradient leading-relaxed"
            >
              {{ verse?.latinText }}
            </p>
          </div>

          <!-- Translation -->
          <div>
            <p
              class="text-sm text-app-muted leading-relaxed font-opensans border-l-2 border-amber-500/30 pl-4"
            >
              {{ verse?.translation }}
            </p>
          </div>

          <!-- Divider -->
          <div
            class="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"
          />

          <!-- Tafsir -->
          <div>
            <h4
              class="text-xs uppercase tracking-widest text-amber-500/60 font-opensans mb-3"
            >
              Tafsir
            </h4>
            <p
              class="text-sm text-app-muted leading-relaxed font-opensans text-justify"
            >
              {{ tafsir ?? "Tafsir tidak tersedia untuk ayat ini." }}
            </p>
          </div>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
