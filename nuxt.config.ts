// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@formkit/auto-animate',
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      Montserrat: [400, 500, 700], // добавьте нужные вам веса шрифта
    },
    display: 'swap', // рекомендованная опция для улучшения производительности
  },
})
