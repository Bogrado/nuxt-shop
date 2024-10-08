declare module '@nuxt/schema' {
  interface NuxtConfig {
    devServer?: {
      port?: number
    }
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
        anonName?: string
        anonExpires?: number
        baseUrl?: string
        cookieName?: string
        cookieExpires?: number
        cookieRememberMeExpires?: number
      }
      redisUrl?: string
      redisPort?: number
      redisPassword?: string
    }
    routeRules?: object
  }
}
