// server/api/cart/anon_cart.delete.ts
import redis from '~/server/utils/redis'
import { handleFetchError } from '~/utils/handleFetchError'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { sessionId } = body

  if (!sessionId) {
    throw new Error('Session ID is required for deletion')
  }

  try {
    await redis.del(`cart:${sessionId}`)
    return { success: true }
  } catch (e) {
    handleFetchError(e)
  }
})
