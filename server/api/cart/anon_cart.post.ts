// server/api/cart/anon_cart.post.ts
import redis from '~/server/utils/redis'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { sessionId, cartItems } = body

  if (!sessionId || !cartItems) {
    throw new Error('Invalid data')
  }

  // Сохраняем данные корзины в Redis с уникальным sessionId
  await redis.set(`cart:${sessionId}`, JSON.stringify(cartItems), 'EX', 3600) // Срок жизни - 1 час

  return { success: true }
})
