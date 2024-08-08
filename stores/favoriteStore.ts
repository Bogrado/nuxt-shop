import type { FavoritesData, Item } from '~/types'
import type { ComputedRef } from 'vue'

export const useFavoriteStore = defineStore('favorites', () => {
  const authStore = useAuthStore()
  const user = computed(() => authStore.getUser)

  const state = reactive({
    items: [] as Item[],
  })

  const loadUserFavorites = async () => {
    if (user?.value?.id) {
      try {
        const favorites: FavoritesData = await $fetch(
          `/api/favorites/user_items`,
          {
            params: { user_id: user.value.id },
          }
        )
        state.items = favorites.items
      } catch (error) {
        console.error('Error cartLoading user cart:', error)
      } finally {
        /* empty */
      }
    } else {
      console.error('User is not authenticated')
    }
  }

  const syncFavoritesWithServer = async () => {
    if (user?.value?.id) {
      try {
        await $fetch(`/api/favorites/user_items`, {
          method: 'PATCH',
          body: { user_id: user.value.id, items: itemsWithIds.value },
        })
      } catch (error) {
        console.error('Error syncing cart with server:', error)
      } finally {
        /* empty */
      }
    }
  }

  const loadFavoritesProducts = async () => {
    try {
      if (itemIds.value.length > 0) {
        state.items = await $fetch<Item[]>('/api/data/items', {
          method: 'GET',
          params: {
            id: itemIds.value,
            _select: '-description',
          },
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

  const addItemToFavorites = (itemId: number) => {
    if (!state.items.some(favorite => favorite.id === itemId)) {
      state.items.push({
        category: 'loading...',
        count: 0,
        image: 'https://placehold.co/600x400',
        price: 0,
        rate: 0,
        title: 'loading...',
        id: itemId,
      })
    }
  }

  const removeItemFromFavorites = (itemId: number) => {
    state.items = state.items.filter(item => item.id !== itemId)
  }
  const itemsWithIds = computed(() => {
    return state.items.map((item: { id: number }) => ({ id: item.id })) // для передачи в боди объектов из state в виде {id: number}
  })

  const toggleFavorite = async (itemId: number) => {
    const existingId = state.items.find(favorite => favorite.id === itemId)
    if (existingId) {
      removeItemFromFavorites(itemId)
    } else {
      addItemToFavorites(itemId)
    }
  }

  const itemIds = computed(() => {
    return state.items.map(item => item.id)
  })

  const products = computed(() => state.items)
  const totalItems: ComputedRef<number> = computed(() => state.items.length)
  watch(totalItems, async () => {
    if (user?.value?.id) {
      await syncFavoritesWithServer()
    }
    await loadFavoritesProducts()
  })

  return {
    state,
    loadUserFavorites,
    loadFavoritesProducts,
    toggleFavorite,
    products,
    totalItems,
  }
})
