<script lang="ts" setup>
import Quran from "~/assets/images/quran.png";
import Tafsir from "~/assets/images/tafsir.png";
import Praying from "~/assets/images/praying.png";
import Hadist from "~/assets/images/hadist.png";

const dataNavigation = [
  {
    name: "Surah",
    image: Quran,
    route: "/surah",
  },
  {
    name: "Tafsir",
    image: Tafsir,
    route: "/tafsir",
  },
  {
    name: "Doa",
    image: Praying,
    route: "/doa",
  },
  {
    name: "Hadist",
    image: Hadist,
    route: "/hadist",
  },
];
</script>

<template>
  <PageContainer class="min-h-[calc(100vh-4rem)]">
    <div class="grid grid-cols-6 mt-16">
      <div class="col-span-3 col-start-2 col-end-6">
        <!-- Headline -->
        <div class="mt-4 text-center">
          <h3 class="text-4xl text-orange-500 font-bold font-serif uppercase">
            Kumpulan Al-Qur'an, Tafsir, dan Doa
          </h3>
          <p class="mt-4 mb-2">
            Barangsiapa yang membaca satu huruf al-Qur`an maka baginya satu
            kebaikan dan satu kebaikan dibalas sepuluh kebaikan, aku tidak
            mengatakan satu huruf, tetapi alif satu huruf, lam satu huruf dan
            mim satu huruf.
          </p>
          <span class="text-sm text-gray-200 mt-4">
            "HR. At-Tirmidzi(2910) dan ia berkata : Hasan shahih dari jalur ini,
            dan sebagian ulama mutaakhirin menshahihkannya secara mauquf kepada
            Ibnu Mas'ud"
          </span>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-4 mt-16">
      <div class="col-span-2 col-start-2 col-end-4">
        <div
          class="grid grid-cols-2 bg-gradient-to-br from-yellow-500 to-orange-800 p-8 rounded-xl"
        >
          <div>
            <span class="flex items-center gap-2">
              <Icon
                name="material-symbols:menu-book-rounded"
                class="text-2xl"
              />
              <p class="text-sm font-semibold">Terakhir dibaca</p>
            </span>
            <div class="mt-4">
              <p class="text-4xl font-serif font-extrabold">Al-Kahfi</p>
              <p class="text-sm text-gray-200">Ayat ke-50</p>
            </div>
          </div>
          <div class="relative">
            <img
              src="~/assets/images/quran-kal.png"
              alt="kalamullah"
              class="w-[150px] object-cover block ml-auto"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-8 my-16 mx-24">
      <div
        v-for="(nav, index) in dataNavigation"
        :key="index"
        class="p-8 rounded-xl border border-orange-500 hover:border-transparent hover:shadow-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-orange-800 transition-all duration-300 ease-in-out"
      >
        <NuxtLink :to="nav.route">
          <div class="relative">
            <img
              :src="nav.image"
              :alt="nav.name"
              class="w-[100px] object-cover block mx-auto"
            />
          </div>
          <p class="text-center text-white font-semibold mt-4">
            {{ nav.name }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </PageContainer>
</template>
