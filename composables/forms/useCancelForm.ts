export const useCancelForm = (emit: (arg0: string) => void) => {
  const error = ref('')
  const { patchOrderStatus } = useUserOrders()
  const confirmCancel = async (id: number) => {
    try {
      await patchOrderStatus(id, 'canceled')
      emit('closeModal')
    } catch (e) {
      handleFetchError(e)
    }
  }

  return {
    confirmCancel,
    error,
  }
}
