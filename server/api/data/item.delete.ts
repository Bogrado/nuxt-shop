// server/api/data/item.delete.ts
import { handleFetchError } from '~/utils/handleFetchError'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event = {} as H3Event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  try {
    return await $fetch(`${config.public.baseUrl}/items/${query.id}`, {
      method: 'DELETE',
    })
  } catch (err) {
    handleFetchError(err)
  }
})
