<script setup lang="ts">
import type { ISurah } from "~/types/interfaces";

defineProps<{ surah: ISurah[] }>();

const router = useRouter();

const handleClick = (number: number) => {
  router.push(`/read-quran/${number}`);
};

</script>

<template>
  <div class="grid grid-cols-1 gap-4" style="direction: rtl">
    <div
      v-for="data in surah"
      :key="data.number"
      @click="handleClick(data.number)"
      class="flex gap-4 items-center bg-gradient-to-br from-yellow-500 to-orange-800 p-4 m-2 shadow-lg rounded-xl min-h-32 cursor-pointer hover:drop-shadow-2xl hover:shadow-gray-700 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 ease-in-out "
    >
      <p class="text-2xl font-lpmq flex-1 font-extrabold">{{ data.name }}</p>
      <div class="flex flex-col" style="direction: ltr">
        <p class="text-xl tracking-wide font-bold font-oleo">
          {{ data.latinName }}
        </p>
        <p class="text-sm text-gray-200">{{ data.meaning }}</p>
      </div>
      <p class="text-2xl font-bold w-10 text-center">
        {{ data.number }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
