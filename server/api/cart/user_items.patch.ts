// server\api\cart\user_items.patch.ts
import { handleFetchError } from '~/utils/handleFetchError'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event = {} as H3Event) => {
  const config = useRuntimeConfig()
  const { user_id, items } = await readBody<{
    user_id: number
    items: []
  }>(event)

  try {
    return await $fetch(`${config.public.baseUrl}/cart/${user_id}`, {
      method: 'PATCH',
      body: { items },
    })
  } catch (err) {
    handleFetchError(err)
  }
})
