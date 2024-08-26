import { ref } from 'vue'
import { useItemsManagerStore } from '@/stores/itemsManagerStore.js'

export const useDeleteForm = (emit: (arg0: string) => void) => {
  const itemsManagerStore = useItemsManagerStore()
  const error = ref('')

  const confirmDelete = async (id: number) => {
    try {
      await $fetch('/api/data/item', {
        method: 'DELETE',
        params: { id },
      })
      emit('closeModal')
      await itemsManagerStore.loadProducts()
    } catch (e) {
      handleFetchError(e)
    }
  }

  return {
    confirmDelete,
    error,
  }
}
