// server/api/orders/user_items.get.ts
import { handleFetchError } from '~/utils/handleFetchError'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event = {} as H3Event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  try {
    console.log(query.user_id)
    return await $fetch(`${config.public.baseUrl}/orders/${query.user_id}`, {
      method: 'GET',
      params: query,
    })
  } catch (err) {
    handleFetchError(err)
  }
})
