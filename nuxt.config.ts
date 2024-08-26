const ONE_DAY = 60 * 60 * 24 * 1000
const ONE_WEEK = ONE_DAY * 7
const ONE_HOUR = 60 * 60 * 1000
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: ['~/plugins/auth.server.ts'],
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
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/google-fonts',
  ],
  devServer: {
    port: 3001,
  },
  googleFonts: {
    families: {
      Montserrat: [400, 500, 700], // добавьте нужные вам веса шрифта
    },
    display: 'swap', // рекомендованная опция для улучшения производительности
  },
  runtimeConfig: {
    public: {
      anonName: process.env.GUEST_NAME || 'anon_session_id',
      anonExpires: parseInt(
        process.env.ANON_EXPIRES || ONE_HOUR.toString(),
        10
      ), // 1 hour
      cookieName: process.env.COOKIE_NAME || 'auth_token',
      baseUrl: process.env.BASE_URL || 'https://7af91f1883946b22.mokky.dev',
      cookieExpires: parseInt(
        process.env.COOKIE_EXPIRES || ONE_DAY.toString(),
        10
      ), // 1 day
      cookieRememberMeExpires: parseInt(
        process.env.COOKIE_REMEMBER_ME_EXPIRES || ONE_WEEK.toString(),
        10
      ), // 7 days
    },
    redisUrl: process.env.REDIS_URL || '95.164.2.168',
    redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),
    redisPassword: process.env.REDIS_PASSWORD || '111241698',
  },
})
