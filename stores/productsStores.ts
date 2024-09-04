import debounce from 'lodash.debounce'
import type { Item } from '~/types'

export const useProductsStore = defineStore('products', () => {
  const items = ref<Item[]>([])
  const searchQuery = ref<string>('')
  const sortBy = ref<string>('')

  const loadProducts = async (): Promise<Item[]> => {
    try {
      let query = '_select=id,title,slug,price,category,image,rate,count'
      if (searchQuery.value) {
        query += `&title=*${searchQuery.value}*`
      }
      if (sortBy.value) {
        query += `&sortBy=${sortBy.value}`
      }
      const response = await $fetch<Item[]>(`/api/data/items?${query}`, {
        method: 'GET',
      })
      items.value = response
      return response
    } catch (error) {
      handleFetchError(error)
      return []
    }
  }

  const setSearchQuery = debounce((query: string) => {
    searchQuery.value = query
  }, 600)

  const setSortBy = (sort: string) => {
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
