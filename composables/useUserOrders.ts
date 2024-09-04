import type { Item } from '~/types'
import { denormalizeItems } from '~/utils/denormalizeItems'

export const useUserOrders = () => {
  const loading = ref(false)
  const products = ref<Item[] | null>(null)
  const loadOrderProducts = async (ids: number[]) => {
    loading.value = true
    if (ids.length > 0) {
      try {
        const response = await $fetch<Item[]>('/api/data/items', {
          params: {
            id: ids,
            _select: 'id,slug,image,title,category',
          },
        })
        products.value = denormalizeItems(response, ids)
      } catch (e) {
        handleFetchError(e)
      } finally {
        loading.value = false
      }
    }
  }

  const patchOrderStatus = async (orderId: number, orderStatus: string) => {
    try {
      await $fetch('/api/orders/order', {
        method: 'PATCH',
        params: { id: orderId },
        body: { orderStatus },
      })
    } catch (e) {
      handleFetchError(e)
    }
  }

  return {
    products,
    loading,
    loadOrderProducts,
    patchOrderStatus,
  }
}
