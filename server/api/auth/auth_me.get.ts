import { handleFetchError } from '~/server/api/utils/handleFetchError'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const token = getCookie(event, config.public.cookieName)

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No token provided',
    })
  }

  try {
    return await $fetch(`${config.public.baseUrl}/auth_me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (err) {
    handleFetchError(err)
  }
})
