// stores\cartStore.ts
import type { ComputedRef } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const loadingStore = useLoadingStore()
  const authStore = useAuthStore()
  const user = computed(() => authStore.getUser)
  const state = reactive({
    items: [],
    loading: false,
  })

  interface Cart {
    user_id: number
    items: []
    id: number
  }

  const loadUserCart = async () => {
    if (user?.value?.id) {
      try {
        const cart: Cart = await $fetch(`/api/cart/user_items`, {
          params: { user_id: user.value.id },
        })
        state.items = cart.items || []
      } catch (error) {
        console.error('Error loading user cart:', error)
      } finally {
        loadingStore.setLoading(false)
      }
    } else {
      console.error('User is not authenticated')
    }
  }

  const syncCartWithServer = async () => {
    if (user?.value?.id) {
      try {
        await $fetch(`/api/cart/user_items`, {
          method: 'PATCH',
          body: { user_id: user.value.id, items: itemsWithIds.value },
        })
      } catch (error) {
        console.error('Error syncing cart with server:', error)
      }
    }
  }
  //
  // const mergeAnonCart = async () => {
  //   const anonCart = JSON.parse(localStorage.getItem('cartItems')) || []
  //   state.items = [...state.items, ...anonCart]
  //   localStorage.removeItem('cartItems')
  //   await syncCartWithServer()
  // }
  //
  // const syncLocalStorage = () => {
  //   localStorage.setItem('cartItems', JSON.stringify(state.items))
  // }
  //
  const addItem = async (itemId: number) => {
    state.items.push({ id: itemId })
    if (user?.value?.id) {
      console.log('additem')
      await syncCartWithServer()
    }
    // else {
    //   syncLocalStorage()
    // }
  }
  //
  // const removeItem = async (itemId: number) => {
  //   const index = state.items.findIndex(item => item.id === itemId)
  //   if (index !== -1) {
  //     state.items.splice(index, 1)
  //     if (authStore.userId) {
  //       await syncCartWithServer()
  //     } else {
  //       syncLocalStorage()
  //     }
  //   }
  // }
  //
  // const removeAll = async (itemId) => {
  //   state.items = state.items.filter((item) => item.id !== itemId)
  //   if (authStore.userId) {
  //     await syncCartWithServer()
  //   } else {
  //     syncLocalStorage()
  //   }
  // }
  //
  // const clearCart = async () => {
  //   state.items = []
  //   if (authStore.userId) {
  //     await syncCartWithServer()
  //   } else {
  //     localStorage.removeItem('cartItems')
  //   }
  // }
  //
  const loadCartProducts = async () => {
    try {
      if (itemIds.value.length > 0) {
        const fetchedProducts = await $fetch('/api/data/items', {
          method: 'GET',
          params: {
            id: itemIds.value,
            _select: '-description',
          },
        })
        state.items = fetchedProducts.flatMap(product => {
          const itemCount = itemIds.value.filter(id => id === product.id).length
          return Array(itemCount).fill(product)
        })
        return
      }
      state.items = []
    } catch (error) {
      console.error('Failed to load cart products:', error)
    } finally {
      /* empty */
    }
  }
  //
  // const itemQuantity = computed(() => (itemId) => state.items.filter((item) => item.id === itemId).length)
  const products = computed(() => {
    const uniqueProducts = {}
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

  watch(totalItems, async () => {
    if (user?.value?.id) {
      await syncCartWithServer()
      await loadCartProducts()
    }
    // else {
    //   console.log(1)
    //   syncLocalStorage()
    // }
  })
  return {
    state,
    addItem,
    loadUserCart,
    totalItems,
    itemsWithIds,
    loadCartProducts,
    products,
    // removeItem,
    // removeAll,
    // clearCart,
    // totalItems,
    // itemIds,
    // loadCartProducts,
    // itemQuantity,
    // products,
    // totalPrice,
    // syncCartWithServer,
    // mergeAnonCart,
  }
})
