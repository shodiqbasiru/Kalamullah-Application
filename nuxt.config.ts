// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@vueuse/nuxt",
  ],
  app:{
    head: {
      title: "Kalamullah"
    }
  },
  experimental: {
    asyncContext: true
  },
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: false,
  },
  googleFonts: {
    families: {
      Quicksand: true,
      "Open+Sans": true,
      "Oleo Script": true,
      "IBM Plex Sans Arabic": true,
    },
  },
});