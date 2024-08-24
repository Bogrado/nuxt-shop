// stores/cartStore.ts
import type { ComputedRef } from 'vue'
import type { Item } from '~/types'
import { useCartManagement } from '~/stores/cart-modules/actions/cartManagement'
import { useSyncCart } from '~/stores/cart-modules/actions/syncCart'

export const useCartStore = defineStore('cart', () => {
  const authStore = useAuthStore()
  const user = computed(() => authStore.getUser)
  const state = reactive({
    items: [] as Item[],
    cartLoading: false,
    loadingItems: {} as { [key: number]: boolean }, // состояние загрузки для каждого товара
  })

  const { addItem, removeItem, removeAll, clearCart } = useCartManagement()
  const {
    loadCartProducts,
    loadUserCart,
    mergeAnonCartWithUserCart,
    syncCartWithServer,
    loadAnonCartFromServer,
  } = useSyncCart()

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

  watch(totalItems, async () => {
    await syncCartWithServer()
    console.log('worked')
    await loadCartProducts(itemIds.value)
  })

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
    mergeAnonCartWithUserCart,
    addItem,
    removeItem,
    removeAll,
    clearCart,
    syncCartWithServer,
    loadAnonCartFromServer,
    user,
  }
})
