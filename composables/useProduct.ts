// composables/useProduct.js

import { useRoute, useRouter } from 'vue-router'
import { useFetch, createError } from 'nuxt/app'
import type { FullItem } from '~/types'

export const useFetchProduct = async () => {
  const route = useRoute()
  const router = useRouter()

  const { data, status, error } = await useFetch<FullItem>(`/api/data/item`, {
    params: { id: route.params.id },
  })

  if (error.value) {
    throw createError({ statusCode: error.value.statusCode, message: error.value.message })
  }

  if (data.value && data.value.slug !== route.params.slug) {
    await router.replace({
      path: `/product/${data.value.slug}_${route.params.id}`,
      query: route.query,
    })
  }

  return { data, status, error, }
}
