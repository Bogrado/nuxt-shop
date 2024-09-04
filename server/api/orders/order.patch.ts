// server/api/orders/order.patch.ts
import { handleFetchError } from '~/utils/handleFetchError'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event = {} as H3Event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const { orderStatus } = await readBody<{
    orderStatus: string
  }>(event)

  try {
    return await $fetch(`${config.public.baseUrl}/orders/${query.id}`, {
      method: 'PATCH',
      body: { status: orderStatus },
    })
  } catch (err) {
    handleFetchError(err)
  }
})
