// server/api/orders/orders.get.ts
import { handleFetchError } from '~/utils/handleFetchError'
import type { H3Event } from 'h3'

export default defineEventHandler(async (_event: H3Event = {} as H3Event) => {
  const config = useRuntimeConfig()

  try {
    return await $fetch(`${config.public.baseUrl}/orders/`, {
      method: 'GET',
    })
  } catch (err) {
    handleFetchError(err)
  }
})
