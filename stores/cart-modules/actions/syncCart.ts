// stores/cart-modules/syncCart.ts
import type { CartData, Item } from '~/types'
import { denormalizeCartItems } from '~/utils/denormalizeCartItems'

export const useSyncCart = () => {
  const config = useRuntimeConfig()
  const cartStore = useCartStore()
  const authStore = useAuthStore()
  const user = computed(() => authStore.getUser)
  const sessionId = computed(() => authStore.getAnonSessionId)

  const loadCartProducts = async (itemIds: number[] = []) => {
    cartStore.state.cartLoading = true
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

        cartStore.state.items = denormalizeCartItems(fetchedProducts, itemIds)
      } else {
        cartStore.state.items = []
      }
    } catch (e) {
      handleFetchError(e)
    } finally {
      cartStore.state.cartLoading = false
    }
  }

  const loadAnonCartFromServer = async () => {
    if (user?.value?.id) return

    try {
      const response: CartData = await $fetch('/api/cart/anon_cart', {
        params: { sessionId: sessionId.value },
      })

      const itemIds = response.items.map((item: { id: number }) => item.id)

      if (itemIds.length > 0) {
        await loadCartProducts(itemIds)
      } else {
        cartStore.state.items = []
      }
    } catch (e) {
      handleFetchError(e)
    } finally {
      cartStore.state.cartLoading = false
    }
  }

  const loadUserCart = async () => {
    cartStore.state.cartLoading = true
    if (user?.value?.id) {
      try {
        const response: CartData = await $fetch(`/api/cart/user_items`, {
          params: { user_id: user.value.id },
        })
        const itemIds = response.items.map((item: { id: number }) => item.id)
        if (itemIds.length > 0) {
          await loadCartProducts(itemIds)
        } else {
          cartStore.state.items = []
        }
      } catch (e) {
        handleFetchError(e)
      } finally {
        cartStore.state.cartLoading = false
      }
    }
  }

  const saveAnonCartToServer = async () => {
    if (!sessionId.value) return

    try {
      await $fetch('/api/cart/anon_cart', {
        method: 'POST',
        body: {
          sessionId: sessionId.value,
          cartItems: cartStore.itemsWithIds,
        },
      })
    } catch (e) {
      handleFetchError(e)
    }
  }

  const syncCartWithServer = async () => {
    cartStore.state.cartLoading = true
    if (user?.value?.id) {
      try {
        await $fetch(`/api/cart/user_items`, {
          method: 'PATCH',
          body: { user_id: user.value.id, items: cartStore.itemsWithIds },
        })
        await loadCartProducts(cartStore.itemIds)
      } catch (e) {
        handleFetchError(e)
      } finally {
        cartStore.state.cartLoading = false
      }
    } else {
      await saveAnonCartToServer()
    }
  }

  const mergeAnonCartWithUserCart = async () => {
    console.log('mergeAnonCartWithUserCart')
    try {
      await loadAnonCartFromServer()

      if (cartStore.state.items.length > 0) {
        const userCart: CartData = await $fetch(`/api/cart/user_items`, {
          params: { user_id: user?.value?.id },
        })

        const userCartItems = userCart.items.map(
          (item: { id: number }) => item.id
        )
        const mergedItems = [...userCartItems, ...cartStore.itemIds]

        await loadCartProducts(mergedItems)
        await syncCartWithServer()

        await $fetch(`/api/cart/anon_cart`, {
          method: 'DELETE',
          body: { sessionId: sessionId.value },
        })

        localStorage.removeItem(config.public.anonName)
        authStore.removeSessionId()
      }
    } catch (e) {
      handleFetchError(e)
    }
  }
  return {
    loadCartProducts,
    loadUserCart,
    loadAnonCartFromServer,
    saveAnonCartToServer,
    mergeAnonCartWithUserCart,
    syncCartWithServer,
  }
}
