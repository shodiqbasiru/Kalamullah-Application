<script lang="ts" setup>
const emit = defineEmits(["play"]);

const handlePlay = () => {
  emit("play");
};


</script>

<template>
  <div
    class="flex justify-center items-center py-4 pe-4 gap-4 bg-gray-900 text-white rounded-lg"
  >
    <span
      class="text-2xl text-yellow-400 cursor-pointer hover:text-yellow-600 transition-all duration-100 ease-in-out"
    >
      <Icon name="ion:play-skip-back-sharp" />
    </span>
    <span
      class="text-3xl text-yellow-400 cursor-pointer hover:text-yellow-600 transition-all duration-100 ease-in-out"
    >
      <Icon name="ion:play-back" />
    </span>

    <span
      @click="handlePlay"
      class="text-4xl text-yellow-400 cursor-pointer hover:text-yellow-600 transition-all duration-100 ease-in-out"
    >
      <Icon name="ion:play-circle-sharp" />
    </span>

    <span
      class="text-4xl text-red-500 cursor-pointer hover:text-red-700 transition-all duration-100 ease-in-out"
    >
      <Icon name="ion:stop-circle" />
    </span>

    <span
      class="text-3xl text-red-500 cursor-pointer hover:text-red-700 transition-all duration-100 ease-in-out"
    >
      <Icon name="ion:play-forward" />
    </span>

    <span
      class="text-2xl text-red-500 cursor-pointer hover:text-red-700 transition-all duration-100 ease-in-out"
    >
      <Icon name="ion:play-skip-forward" />
    </span>
  </div>
</template>

<style scoped></style>
