// server/api/auth/register.post.ts
import { handleFetchError } from '~/server/api/utils/handleFetchError'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const { email, password, nickName } = body

  try {
    const response = await $fetch(`${config.public.baseUrl}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: { email, password, nickName, role: 'user' },
    })

    return response
  } catch (err) {
    handleFetchError(err)
  }
})
