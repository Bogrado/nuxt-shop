// server/api/cart/anon_cart.get.ts
import redis from '~/server/utils/redis'

export default defineEventHandler(async event => {
  const { sessionId } = getQuery(event)

  if (!sessionId) {
    return { items: [] }
  }

  // Получаем данные корзины из Redis
  const cartData = await redis.get(`cart:${sessionId}`)
  return { items: cartData ? JSON.parse(cartData) : [] }
})
