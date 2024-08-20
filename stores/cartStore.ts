// stores/cartStore.ts
import type { ComputedRef } from 'vue'
import type { CartData, Item } from '~/types'
import { denormalizeCartItems } from '~/utils/denormalizeCartItems'

export const useCartStore = defineStore('cart', () => {
  const authStore = useAuthStore()
  const user = computed(() => authStore.getUser)
  const state = reactive({
    items: [] as Item[],
    cartLoading: false,
    loadingItems: {} as { [key: number]: boolean }, // состояние загрузки для каждого товара
  })

  const loadUserCart = async () => {
    state.cartLoading = true
    if (user?.value?.id) {
      try {
        const cart: CartData = await $fetch(`/api/cart/user_items`, {
          params: { user_id: user.value.id },
        })
        state.items = [...state.items, ...cart.items]
      } catch (error) {
        console.error('Error cartLoading user cart:', error)
      } finally {
        state.cartLoading = false
      }
    } else {
      console.error('User is not authenticated')
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
    }
  }
  const addItem = async (itemId: number) => {
    // в принципе.... да все-равно заменятся, пусть будут пустые
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
      if (user?.value?.id) {
        console.log('additem')
        await syncCartWithServer()
      }
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
        if (user?.value?.id) {
          await syncCartWithServer()
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      state.loadingItems[itemId] = false
    }
  }
  const removeAll = async (itemId: number) => {
    state.items = state.items.filter(item => item.id !== itemId)
    if (user?.value?.id) {
      await syncCartWithServer()
    }
  }
  const clearCart = async () => {
    state.items = []
    if (user?.value?.id) {
      await syncCartWithServer()
    }
  }
  const loadCartProducts = async () => {
    state.cartLoading = true
    try {
      if (itemIds.value.length > 0) {
        const fetchedProducts: Item[] = await $fetch<Item[]>(
          '/api/data/items',
          {
            method: 'GET',
            params: {
              id: itemIds.value,
              _select: '-description',
            },
          }
        )
        state.items = denormalizeCartItems(fetchedProducts, itemIds.value)
        return
      }
      state.items = []
    } catch (error) {
      console.error('Failed to load cart products:', error)
    } finally {
      state.cartLoading = false
    }
  }
  //
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
  //
  // const totalPrice = computed(() => {
  //   const total = state.items.reduce((total, item) => total + item.price, 0)
  //   return Number(total.toFixed(2))
  // })
  //
  const itemIds = computed(() =>
    state.items.map((item: { id: number }) => item.id)
  )
  const totalItems: ComputedRef<number> = computed(() => state.items.length) // кол-во товаров в корзине
  const itemsWithIds = computed(() => {
    return state.items.map((item: { id: number }) => ({ id: item.id })) // для передачи в боди объектов из state в виде {id: number}
  })
  const cartLoading = computed(() => state.cartLoading)
  const itemLoading = computed(() => (itemId: number) => {
    return state.loadingItems[itemId] || false
  })
  watch(totalItems, async () => {
    if (user?.value?.id) {
      await syncCartWithServer()
    }
    await loadCartProducts()
  })
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
  }
})
