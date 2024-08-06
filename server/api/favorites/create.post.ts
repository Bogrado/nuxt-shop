// server/api/favorites/create.post.ts
import { handleFetchError } from '~/utils/handleFetchError'

export default defineEventHandler(async event => {
  const body = await readBody<{
    user_id: number
    items: []
  }>(event)

  const { user_id, items } = body

  try {
    return await $fetch(`${useRuntimeConfig().public.baseUrl}/favorites`, {
      method: 'POST',
      body: { user_id, items },
    })
  } catch (err) {
    handleFetchError(err)
  }
})
