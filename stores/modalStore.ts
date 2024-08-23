// stores/modalStore.ts
import { formsContainer } from '@/composables/forms/formsContainer'

export const useModalStore = defineStore('modal', () => {
  const state = reactive({
    isOpen: false,
    modalKey: '',
    itemId: null,
  })

  const openModal = (key: string, id = null) => {
    state.modalKey = key
    state.isOpen = true
    state.itemId = id
  }

  const closeModal = () => {
    state.modalKey = ''
    state.isOpen = false
    state.itemId = null
  }

  const switchModal = (newKey: string, id = null) => {
    closeModal()
    setTimeout(() => {
      openModal(newKey, id)
    }, 500)
  }

  const currentComponent = computed(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return formsContainer[state.modalKey] || null
  })

  return {
    state,
    openModal,
    closeModal,
    switchModal,
    currentComponent,
  }
})
