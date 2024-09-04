// server/api/auth/user.patch.ts
import { handleFetchError } from '~/utils/handleFetchError'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event = {} as H3Event) => {
  const config = useRuntimeConfig()
  const { body } = await readBody<{
    body: object
  }>(event)
  const { id } = getQuery(event)

  try {
    return await $fetch(`${config.public.baseUrl}/users/${id}`, {
      method: 'PATCH',
      body: { body },
    })
  } catch (err) {
    handleFetchError(err)
  }
})
