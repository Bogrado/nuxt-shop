import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const items = ref([])

  const loadProducts = async () => {
    try {
      const response = await $fetch('https://6f8022cf47b3f024.mokky.dev/items')
      items.value = response
      return response
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const getProducts = computed(() => items.value)

  return { items, loadProducts, getProducts }
})
