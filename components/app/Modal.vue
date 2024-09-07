<script setup lang="ts">
import type { IVerse } from '~/types/interfaces';

defineProps<{ 
  isOpen: boolean
  verse: IVerse | undefined;
  tafsir: string | undefined;
  surahName: string | undefined;
}>();

const emit = defineEmits(["closeModal"]);

const handleClose = () => {
  emit("closeModal");
};
</script>

<template>
  <div>
    <UModal :model-value="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-semibold bg-gradient-to-r from-yellow-500 via-red-500 to-orange-800 text-transparent bg-clip-text font-oleo">
               Tafsir {{ surahName }} Ayat Ke-{{ verse?.verseNumber }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="handleClose" />
          </div>
        </template>
        <Placeholder>
          <div class="px-3 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-black overflow-y-auto max-h-[calc(80vh-1rem)]">
            <div class="flex flex-col gap-4 ">
              <div class="mb-3">
                  <p class="text-3xl text-gray-700 dark:text-gray-300 font-lpmq leading-loose text-justify" style="direction: rtl">
                    {{ verse?.arabicText }}
                  </p>
              </div>
              <div class="flex flex-col gap-2">
                <h4 class="text-xl font-semibold text-gray-900 dark:text-white">Tafsir</h4>
                <p class="text-lg text-gray-700 dark:text-gray-300 text-justify">{{ tafsir }}</p>
              </div>
            </div>
          </div>
        </Placeholder>

      </UCard>
    </UModal>
  </div>
</template>