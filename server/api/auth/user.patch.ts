// server/api/auth/users.patch.ts
import { handleFetchError } from '~/utils/handleFetchError'
import type { H3Event } from 'h3'
import type { Address } from '~/types'

export default defineEventHandler(async (event: H3Event = {} as H3Event) => {
  const config = useRuntimeConfig()
  const { firstName, lastName, address } = await readBody<{
    firstName: string
    lastName: string
    address: Address
  }>(event)
  const query = getQuery(event)

  const body = () => {
    if (firstName && lastName && address && address.country && address.city) {
      return { firstName, lastName, address }
    }
    if (firstName && lastName) {
      return { firstName, lastName }
    }
    if (address) {
      return { address }
    }
  }

  try {
    return await $fetch(`${config.public.baseUrl}/users/${query.id}`, {
      method: 'PATCH',
      body: body(),
    })
  } catch (err) {
    handleFetchError(err)
  }
})
