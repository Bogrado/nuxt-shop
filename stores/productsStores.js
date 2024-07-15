import debounce from 'lodash.debounce'

export const useProductsStore = defineStore('products', () => {
  const items = ref([])
  const searchQuery = ref('')
  const sortBy = ref('')

  const loadProducts = async () => {
    console.log(1)
    try {
      const query = new URLSearchParams()
      if (searchQuery.value) {
        query.append('title', `*${searchQuery.value}*`)
      }
      if (sortBy.value) {
        query.append('sortBy', sortBy.value)
      }
      const response = await $fetch(
        `https://6f8022cf47b3f024.mokky.dev/items?${query.toString()}`
      )
      items.value = response
      return response
    } catch (error) {
      console.error(error)
      return []
    }
  }

  // const setSearchQuery = query => debounce({
  //   searchQuery.value = query
  // }, 500)

  const setSearchQuery = debounce(query => {
    searchQuery.value = query
  }, 1000)

  const setSortBy = sort => {
    sortBy.value = sort
  }

  const getProducts = computed(() => items.value)
  const getSearchQuery = computed(() => searchQuery.value)
  const getSortBy = computed(() => sortBy.value)

  return {
    items,
    loadProducts,
    getProducts,
    setSearchQuery,
    setSortBy,
    searchQuery,
    sortBy,
    getSearchQuery,
    getSortBy,
  }
})
