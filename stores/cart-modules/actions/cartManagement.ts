// stores/cart-modules/cartManagement.ts
import { useCartStore } from '~/stores/cartStore'

export const useCartManagement = () => {
  const cartStore = useCartStore()

  const addItem = async (itemId: number) => {
    cartStore.dontSync = true
    cartStore.state.loadingItems[itemId] = true
    try {
      cartStore.state.items.push({
        category: '',
        count: 0,
        image: 'https://placehold.co/600x400',
        price: 0,
        rate: 0,
        title: '',
        slug: '',
        id: itemId,
      })
      await cartStore.syncCartWithServer()
      await cartStore.loadAnonCartFromServer()
    } catch (e) {
      handleFetchError(e)
    } finally {
      cartStore.state.loadingItems[itemId] = false
      cartStore.dontSync = false
    }
  }

  const removeItem = async (itemId: number) => {
    cartStore.dontSync = true
    cartStore.state.loadingItems[itemId] = true
    try {
      const index = cartStore.state.items.findIndex(item => item.id === itemId)
      if (index !== -1) {
        cartStore.state.items.splice(index, 1)
      }
      await cartStore.syncCartWithServer()
      await cartStore.loadAnonCartFromServer()
    } catch (e) {
      handleFetchError(e)
    } finally {
      cartStore.state.loadingItems[itemId] = false
      cartStore.dontSync = true
    }
  }

  const removeAll = async (itemId: number) => {
    cartStore.state.items = cartStore.state.items.filter(
      item => item.id !== itemId
    )
  }

  const clearCart = async () => {
    cartStore.state.items = []
  }

  return {
    addItem,
    removeItem,
    removeAll,
    clearCart,
  }
}
