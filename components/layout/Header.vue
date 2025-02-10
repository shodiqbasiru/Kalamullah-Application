<script lang="ts" setup></script>

<template>
  <PageContainer>
    <header class="shadow-lg text-white flex items-center">
      <NuxtLink to="/">
        <img src="/dark-logo-2.svg" alt="kalamullah" class="w-full h-[100px]" />
      </NuxtLink>
      <nav class="ml-auto flex gap-8 text-xl uppercase tracking-wider pt-7">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/surah/1">Surah</NuxtLink>
        <NuxtLink to="/tafsir">Tafsir</NuxtLink>
        <NuxtLink to="/doa">Doa</NuxtLink>
        <NuxtLink to="/hadist">Hadist</NuxtLink>
      </nav>
    </header>
  </PageContainer>
</template>
<style></style>
