export const useItemsManagerStore = defineStore('itemManager', () => {
  const loadingStore = useLoadingStore()
  const state = reactive({
    items: [],
    itemId: <number | null>null,
  })

  const loadProducts = async () => {
    loadingStore.setLoading(true)
    try {
      state.items = await $fetch('/api/data/items', {
        method: 'GET',
        params: { _select: 'id,title,price,category' },
      })
    } catch (e) {
      handleFetchError(e)
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const setItemId = (id: number) => {
    state.itemId = id
  }

  const getItems = computed(() => state.items)
  const getItemId = computed(() => state.itemId)

  return {
    state,
    getItems,
    loadProducts,
    setItemId,
    getItemId,
  }
})
