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

  runtimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL ?? "https://equran.id/api/v2",
    public: {},
  },

  // ── App head ────────────────────────────────────────────────────────
  app: {
    head: {
      title: "Kalamullah",
      htmlAttrs: { lang: "id" },
      meta: [
        {
          name: "description",
          content: "Al-Qur'an digital — Surah, Tafsir, Doa, dan Hadist.",
        },
        { name: "theme-color", content: "#0a0a0a" },
        { name: "color-scheme", content: "dark" },
        { property: "og:title", content: "Kalamullah" },
        {
          property: "og:description",
          content: "Al-Qur'an digital — Surah, Tafsir, Doa, dan Hadist.",
        },
        { property: "og:type", content: "website" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  // ── Color mode ───────────────────────────────────────────────────────
  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "dark",
  },

  // ── Tailwind CSS ─────────────────────────────────────────────────────
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: { level: 2 },
    config: {},
    viewer: false,
  },

  // ── Google Fonts ─────────────────────────────────────────────────────
  googleFonts: {
    families: {
      Quicksand: [400, 500, 600, 700],
      "Open Sans": [400, 600],
      "Oleo Script": [400, 700],
      "IBM Plex Sans Arabic": [400, 500],
      "Scheherazade New": [400, 700],
    },
    display: "swap",
    preload: true,
    download: true,
  },

  // ── Experimental ─────────────────────────────────────────────────────
  experimental: {
    asyncContext: true,
  },
});
