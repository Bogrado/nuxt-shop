// server/api/cart/anon_cart.delete.ts
import redis from '~/server/utils/redis'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { sessionId } = body

  if (!sessionId) {
    throw new Error('Session ID is required for deletion')
  }

  try {
    await redis.del(`cart:${sessionId}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to delete anonymous cart:', error)
    throw new Error('Failed to delete anonymous cart')
  }
})
