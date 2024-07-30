declare module '@nuxt/schema' {
  interface NuxtConfig {
    css?: string[]
    postcss: {
      plugins: {
        tailwindcss: object
        autoprefixer: object
      }
    }
    router?: {
      middleware?: string | string[]
    }
    plugins?: string[]
    compatibilityDate?: string
    runtimeConfig?: {
      public?: {
        baseUrl?: string
        cookieName?: string
        cookieExpires?: number
        cookieRememberMeExpires?: number
      }
    }
  }
}
