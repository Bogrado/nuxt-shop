// server/api/data/item.post.ts
import { handleFetchError } from '~/utils/handleFetchError'

export default defineEventHandler(async event => {
  const body = await readBody<{
    item: NonNullable<unknown>
  }>(event)

  const { item } = body
  try {
    return await $fetch(`${useRuntimeConfig().public.baseUrl}/items`, {
      method: 'POST',
      body: item,
    })
  } catch (err) {
    handleFetchError(err)
  }
})
