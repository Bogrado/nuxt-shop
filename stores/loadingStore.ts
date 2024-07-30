export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const loading = computed(() => isLoading.value)

  return {
    isLoading,
    setLoading,
    loading,
  }
})
