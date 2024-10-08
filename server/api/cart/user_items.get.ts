// server\api\cart\user_items.get.ts${query.user_id}
import { handleFetchError } from '~/utils/handleFetchError'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event = {} as H3Event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  try {
    return await $fetch(`${config.public.baseUrl}/cart/${query.user_id}`, {
      method: 'GET',
      params: query,
    })
  } catch (err) {
    handleFetchError(err)
  }
})
