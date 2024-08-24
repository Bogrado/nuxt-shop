import { defineStore } from 'pinia'
import { reactive, computed, watch, ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const authStore = useAuthStore()
  const cartStore = useCartStore()

  const state = reactive({
    // Нужно ли сокращать или ненужно? Вроде, всё важное
    status: 'created',
    userId: authStore.getUser?.id || '',
    firstName: '',
    lastName: '',
    email: <string | undefined>authStore.getUser?.email || '',
    country: '',
    city: '',
    postalCode: '',
    addressLine1: '',
    houseNumber: '',
    apartmentNumber: '',
    saveAddress: false, // пока не используется, хорошо бы сделать сохранение адреса юзеру, и автозаполнять при монтировании страницы с формой
    agreeToTerms: false,
    created_at: '',
    orderDetails: <{ id: number }[]>[],
    totalPrice: 0,
    error: '',
  })
  const isCreated = ref(false)
  const fullName = computed(() => `${state.firstName} ${state.lastName}`)
  const address = computed(
    () =>
      `${state.addressLine1}, д. ${state.houseNumber}, кв. ${state.apartmentNumber}, ${state.city}, ${state.country}, ${state.postalCode}`
  )

  watch(
    () => authStore.getUser?.email,
    newEmail => {
      state.email = newEmail
    },
    { immediate: true }
  ) // на всякий случай, для смены пользователя

  watch(
    () => cartStore.itemsWithIds,
    newItems => {
      state.orderDetails = newItems
      state.totalPrice = cartStore.totalPrice
    },
    { deep: true, immediate: true }
  ) // просто обновление стейта

  const submitOrder = async () => {
    if (!state.agreeToTerms) {
      state.error = 'Вы должны согласиться на обработку персональных данных.' // подстраховка на случай отключения дизейбла через f12
      return
    }
    try {
      state.created_at = new Date().toISOString()
      const orderData = {
        user: state.email,
        user_id: state.userId,
        status: state.status,
        created_at: state.created_at,
        orderDetails: state.orderDetails,
        totalPrice: state.totalPrice,
        address: address.value,
        fullName: fullName.value,
      }
      await $fetch(`/api/orders/user_items`, {
        method: 'PATCH',
        body: { user_id: state.userId, items: state.orderDetails },
      })
      state.error = ''
      isCreated.value = true
      console.log('Заказ успешно отправлен:', orderData)
      await cartStore.clearCart()
      setTimeout(() => {
        isCreated.value = false
      }, 3000)
    } catch (error) {
      state.error = 'Ошибка при отправке заказа: ' + error.message
    }
  }

  const createdSuccess = computed(() => isCreated.value)

  return {
    state,
    fullName,
    address,
    submitOrder,
    createdSuccess,
  }
})
