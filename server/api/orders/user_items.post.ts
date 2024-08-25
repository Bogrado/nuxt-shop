// server/api/orders/user_items.post.ts
import { handleFetchError } from '~/utils/handleFetchError'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event = {} as H3Event) => {
  const config = useRuntimeConfig()
  const { user_id, item } = await readBody<{
    user_id: number
    item: object
  }>(event)

  try {
    return await $fetch(`${config.public.baseUrl}/orders/`, {
      method: 'POST',
      body: { user_id, ...item },
    })
  } catch (err) {
    handleFetchError(err)
  }
})
