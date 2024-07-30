import debounce from 'lodash.debounce'

export const useProductsStore = defineStore('products', () => {
  const items = ref([])
  const searchQuery = ref('')
  const sortBy = ref('')

  const loadProducts = async () => {
    try {
      const query = new URLSearchParams()
      if (searchQuery.value) {
        query.append('title', `*${searchQuery.value}*`)
      }
      if (sortBy.value) {
        query.append('sortBy', sortBy.value)
      }
      query.append('_select', 'id,title,price,category,image,rate,count')
      const response = await $fetch(
        `https://7af91f1883946b22.mokky.dev/items?${query.toString()}`
      )
      items.value = response
      return response
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const setSearchQuery = debounce(query => {
    searchQuery.value = query
  }, 600)

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
