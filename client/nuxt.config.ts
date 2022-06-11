import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: ["@nuxtjs/tailwindcss"],
  hooks: {
    "builder:watch": console.log,
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "description",
          content: "Discord account profiler on steroids",
        },
      ],
      script: [
        {
          src: "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js",
          type: "module",
        },
      ],
    },
  },
});
