import { handleFetchError } from '~/utils/handleFetchError'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const { email, password, nickName, firstName, lastName } = body

  try {
    const response = await $fetch(`${config.public.baseUrl}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        email,
        password,
        nickName,
        role: 'user',
        firstName,
        lastName,
        address: {},
      },
    })

    return response
  } catch (err) {
    handleFetchError(err)
  }
})
