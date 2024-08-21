import type { ComputedRef } from 'vue'
import type { CartData, Item } from '~/types'
import { denormalizeCartItems } from '~/utils/denormalizeCartItems'
import debounce from 'lodash.debounce'

export const useCartStore = defineStore('cart', () => {
  const authStore = useAuthStore()
  const user = computed(() => authStore.getUser)
  const state = reactive({
    items: [] as Item[],
    sessionId: '', // Сессионный идентификатор для незарегистрированных пользователей
    cartLoading: false,
    loadingItems: {} as { [key: number]: boolean }, // состояние загрузки для каждого товара
  })

  // Инициализация sessionId для незарегистрированных пользователей
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
          // 2. Загружаем полные данные о товарах по их идентификаторам
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
    initSessionId() // Инициализация sessionId при загрузке корзины для незарегистрированных пользователей

    try {
      // 1. Загрузка ID товаров из редис
      const response: CartData = await $fetch('/api/cart/anon_cart', {
        params: { sessionId: state.sessionId },
      })

      const itemIds = response.items.map((item: { id: number }) => item.id)

      if (itemIds.length > 0) {
        // 2. Загружаем полные данные о товарах по их идентификаторам
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
      // Сначала загрузка анонимной корзины
      await loadAnonCartFromServer()

      if (state.items.length > 0) {
        // Если есть товары в анонимной корзине, загрузить пользовательскую
        const userCart: CartData = await $fetch(`/api/cart/user_items`, {
          params: { user_id: user?.value?.id },
        })

        const userCartItems = userCart.items.map(
          (item: { id: number }) => item.id
        )

        // Объединить анонимную корзину с пользовательской
        const mergedItems = [...userCartItems, ...itemIds.value]

        // загрузить полные данные о товарах после объединения
        await loadCartProducts(mergedItems)

        // Сохранить объединенную корзину на сервере
        await syncCartWithServer()

        // После объединения корзины можно очистить анонимную корзину на сервере
        await $fetch(`/api/cart/anon_cart`, {
          method: 'DELETE',
          body: { sessionId: state.sessionId },
        })

        // Очистить sessionId, так как корзина теперь объединена
        localStorage.removeItem('cart_session_id')
        state.sessionId = ''
      }
    } catch (error) {
      console.error('Failed to merge anonymous cart with user cart:', error)
    }
  }

  const addItem = async (itemId: number) => {
    state.loadingItems[itemId] = true
    try {
      state.items.push({
        category: '',
        count: 0,
        image: 'https://placehold.co/600x400',
        price: 0,
        rate: 0,
        title: '',
        id: itemId,
      })
      await syncCartWithServer()
    } catch (e) {
      console.error(e)
    } finally {
      state.loadingItems[itemId] = false
    }
  }

  const removeItem = async (itemId: number) => {
    state.loadingItems[itemId] = true
    try {
      const index = state.items.findIndex(item => item.id === itemId)
      if (index !== -1) {
        state.items.splice(index, 1)
        await syncCartWithServer()
      }
    } catch (e) {
      console.error(e)
    } finally {
      state.loadingItems[itemId] = false
    }
  }

  const removeAll = async (itemId: number) => {
    state.items = state.items.filter(item => item.id !== itemId)
    await syncCartWithServer()
  }

  const clearCart = async () => {
    state.items = []
    await syncCartWithServer()
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
        // console.log('loaded cart products:', state.items)
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

  const itemsWithIds = computed(() => {
    return state.items.map((item: { id: number }) => ({ id: item.id }))
  })

  const cartLoading = computed(() => state.cartLoading)

  const itemLoading = computed(() => (itemId: number) => {
    return state.loadingItems[itemId] || false
  })

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
    addItem,
    loadUserCart,
    totalItems,
    itemsWithIds,
    loadCartProducts,
    products,
    itemQuantity,
    removeItem,
    removeAll,
    clearCart,
    itemIds,
    cartLoading,
    itemLoading,
    initSessionId,
    mergeAnonCartWithUserCart,
  }
})
