// server/api/cart/create.post.ts
import { handleFetchError } from '~/utils/handleFetchError'

export default defineEventHandler(async event => {
  const body = await readBody<{
    user_id: number
    items: []
  }>(event)

  const { user_id, items } = body
  console.log('create.post user_id:', user_id, 'items:', items)
  try {
    return await $fetch(`${useRuntimeConfig().public.baseUrl}/cart`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: { user_id, items },
    })
  } catch (err) {
    handleFetchError(err)
  }
})
