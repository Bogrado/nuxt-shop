// server/api/auth/users.patch.ts
import { handleFetchError } from '~/utils/handleFetchError'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event = {} as H3Event) => {
  const config = useRuntimeConfig()
  const { firstName, lastName } = await readBody<{
    firstName: string
    lastName: string
  }>(event)
  const query = getQuery(event)

  try {
    return await $fetch(`${config.public.baseUrl}/users/${query.id}`, {
      method: 'PATCH',
      body: { firstName, lastName },
    })
  } catch (err) {
    handleFetchError(err)
  }
})
