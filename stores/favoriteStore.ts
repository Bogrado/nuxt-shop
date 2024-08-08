import type { FavoritesData, Item } from '~/types'

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

  const itemIds = computed(() => {
    return state.items.map(item => item.id)
  })

  const products = computed(() => state.items)

  return {
    state,
    loadUserFavorites,
    loadFavoritesProducts,
    products,
  }
})
