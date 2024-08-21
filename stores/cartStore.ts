import type { ComputedRef } from 'vue'
import type { CartData, Item } from '~/types'
import { denormalizeCartItems } from '~/utils/denormalizeCartItems'
import debounce from 'lodash.debounce'
import { useCartManagement } from '~/stores/cart-modules/actions'

export const useCartStore = defineStore('cart', () => {
  const authStore = useAuthStore()
  const user = computed(() => authStore.getUser)
  const state = reactive({
    items: [] as Item[],
    sessionId: '', // Сессионный идентификатор для незарегистрированных пользователей
    cartLoading: false,
    loadingItems: {} as { [key: number]: boolean }, // состояние загрузки для каждого товара
  })

  const { addItem, removeItem, removeAll, clearCart } = useCartManagement()

  const initSessionId = () => {
    if (!state.sessionId && import.meta.client && !user?.value?.id) {
      const storedSessionId = localStorage.getItem('cart_session_id')
      if (storedSessionId) {
        state.sessionId = storedSessionId
      } else {
        // Генерация нового уникального sessionId
        state.sessionId = crypto.randomUUID()
        localStorage.setItem('cart_session_id', state.sessionId)
      }
    }
  }

  const loadUserCart = async () => {
    state.cartLoading = true
    if (user?.value?.id) {
      try {
        const response: CartData = await $fetch(`/api/cart/user_items`, {
          params: { user_id: user.value.id },
        })
        const itemIds = response.items.map((item: { id: number }) => item.id)
        if (itemIds.length > 0) {
          await loadCartProducts(itemIds)
        } else {
          state.items = []
        }
      } catch (error) {
        console.error('Error loading user cart:', error)
      } finally {
        state.cartLoading = false
      }
    } else {
      await loadAnonCartFromServer()
    }
  }

  const syncCartWithServer = async () => {
    state.cartLoading = true
    if (user?.value?.id) {
      try {
        await $fetch(`/api/cart/user_items`, {
          method: 'PATCH',
          body: { user_id: user.value.id, items: itemsWithIds.value },
        })
      } catch (error) {
        console.error('Error syncing cart with server:', error)
      } finally {
        state.cartLoading = false
      }
    } else {
      await saveAnonCartToServer()
    }
  }

  const loadAnonCartFromServer = async () => {
    if (user?.value?.id) return
    initSessionId()

    try {
      const response: CartData = await $fetch('/api/cart/anon_cart', {
        params: { sessionId: state.sessionId },
      })

      const itemIds = response.items.map((item: { id: number }) => item.id)

      if (itemIds.length > 0) {
        await loadCartProducts(itemIds)
      } else {
        state.items = []
      }
    } catch (error) {
      console.error('Failed to load anonymous cart:', error)
    } finally {
      state.cartLoading = false
    }
  }

  const saveAnonCartToServer = async () => {
    if (!state.sessionId) return

    try {
      await $fetch('/api/cart/anon_cart', {
        method: 'POST',
        body: { sessionId: state.sessionId, cartItems: itemsWithIds.value },
      })
    } catch (error) {
      console.error('Failed to save anonymous cart:', error)
    }
  }

  const mergeAnonCartWithUserCart = async () => {
    try {
      await loadAnonCartFromServer()

      if (state.items.length > 0) {
        const userCart: CartData = await $fetch(`/api/cart/user_items`, {
          params: { user_id: user?.value?.id },
        })

        const userCartItems = userCart.items.map(
          (item: { id: number }) => item.id
        )
        const mergedItems = [...userCartItems, ...itemIds.value]

        await loadCartProducts(mergedItems)
        await syncCartWithServer()

        await $fetch(`/api/cart/anon_cart`, {
          method: 'DELETE',
          body: { sessionId: state.sessionId },
        })

        localStorage.removeItem('cart_session_id')
        state.sessionId = ''
      }
    } catch (error) {
      console.error('Failed to merge anonymous cart with user cart:', error)
    }
  }

  const loadCartProducts = async (itemIds: number[] = []) => {
    state.cartLoading = true
    try {
      if (itemIds.length > 0) {
        const fetchedProducts: Item[] = await $fetch<Item[]>(
          '/api/data/items',
          {
            method: 'GET',
            params: {
              id: itemIds,
              _select: '-description',
            },
          }
        )

        state.items = denormalizeCartItems(fetchedProducts, itemIds)
      } else {
        state.items = []
      }
    } catch (error) {
      console.error('Failed to load cart products:', error)
    } finally {
      state.cartLoading = false
    }
  }

  const itemQuantity = computed(
    () => (itemId: number) =>
      state.items.filter(item => item.id === itemId).length
  )

  const products = computed(() => {
    const uniqueProducts: { [key: number]: Item } = {}
    state.items.forEach(item => {
      uniqueProducts[item.id] = item
    })
    return Object.values(uniqueProducts)
  })

  const itemIds = computed(() =>
    state.items.map((item: { id: number }) => item.id)
  )

  const totalItems: ComputedRef<number> = computed(() => state.items.length)

  const itemsWithIds = computed(() =>
    state.items.map((item: { id: number }) => ({ id: item.id }))
  )

  const cartLoading = computed(() => state.cartLoading)

  const itemLoading = computed(
    () => (itemId: number) => state.loadingItems[itemId] || false
  )

  watch(
    totalItems,
    debounce(async () => {
      await syncCartWithServer()
      console.log('worked')
      await loadCartProducts(itemIds.value)
    }, 300)
  )

  return {
    state,
    loadUserCart,
    totalItems,
    itemsWithIds,
    loadCartProducts,
    products,
    itemQuantity,
    itemIds,
    cartLoading,
    itemLoading,
    initSessionId,
    mergeAnonCartWithUserCart,
    addItem,
    removeItem,
    removeAll,
    clearCart,
    syncCartWithServer,
  }
})
