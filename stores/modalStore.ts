// stores/modalStore.ts
import { formsContainer } from '@/composables/forms/formsContainer'

export const useModalStore = defineStore('modal', () => {
  const { $disableScroll, $enableScroll } = useNuxtApp()
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
    if (state.modalKey === 'login' || state.modalKey === 'register') {
      const authStore = useAuthStore()
      authStore.clearError()
    }
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

  watch(
    () => state.isOpen,
    newValue => {
      if (newValue) {
        $disableScroll()
      } else {
        $enableScroll()
      }
    }
  )

  return {
    state,
    openModal,
    closeModal,
    switchModal,
    currentComponent,
  }
})
