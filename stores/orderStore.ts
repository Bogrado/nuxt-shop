import { defineStore } from 'pinia'
import { reactive, computed, watch, ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const authStore = useAuthStore()
  const cartStore = useCartStore()
  const { patchUser } = useAuth()

  const state = reactive({
    // Нужно ли сокращать или ненужно? Вроде, всё важное
    status: 'created',
    userId: <number | undefined>authStore.getUser?.id,
    firstName: <string | undefined>authStore.getUser?.firstName || '',
    lastName: <string | undefined>authStore.getUser?.lastName || '',
    email: <string | undefined>authStore.getUser?.email || '',
    country: <string | undefined>authStore.getUser?.address?.country || '',
    city: <string | undefined>authStore.getUser?.address?.city || '',
    postalCode:
      <string | undefined>authStore.getUser?.address?.postalCode || '',
    addressLine1:
      <string | undefined>authStore.getUser?.address?.addressLine1 || '',
    houseNumber:
      <string | undefined>authStore.getUser?.address?.houseNumber || '',
    apartmentNumber:
      <string | undefined>authStore.getUser?.address?.apartmentNumber || '',
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
    () => authStore.getUser,
    newUser => {
      if (newUser) {
        state.email = newUser.email
        state.firstName = newUser.firstName
        state.lastName = newUser.lastName
        state.country = <string>newUser.address?.country
        state.city = <string>newUser.address?.city
        state.postalCode = <string>newUser.address?.postalCode
        state.addressLine1 = <string>newUser.address?.addressLine1
        state.houseNumber = <string>newUser.address?.houseNumber
        state.apartmentNumber = <string>newUser.address?.apartmentNumber
      }
    },
    { immediate: true, deep: true }
  )

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
        status: state.status,
        created_at: state.created_at,
        orderDetails: state.orderDetails,
        totalPrice: state.totalPrice,
        address: address.value,
        fullName: fullName.value,
      }
      await $fetch(`/api/orders/user_items`, {
        method: 'POST',
        body: { user_id: state.userId, item: orderData },
      })
      state.error = ''
      isCreated.value = true
      console.log('Заказ успешно отправлен:', orderData)
      if (state.saveAddress) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        await patchUser(state.userId, {
          firstName: state.firstName,
          lastName: state.lastName,
          address: {
            country: state.country,
            city: state.city,
            postalCode: state.postalCode,
            addressLine1: state.addressLine1,
            houseNumber: state.houseNumber,
            apartmentNumber: state.apartmentNumber,
          },
        })
      }
      await cartStore.clearCart()
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      state.error = 'Ошибка при отправке заказа: ' + error.message
    } finally {
      clearState()
      setTimeout(() => {
        isCreated.value = false
      }, 3000)
    }
  }

  const clearState = () => {
    state.status = 'created'
    state.firstName = <string | undefined>authStore.getUser?.firstName || ''
    state.lastName = <string | undefined>authStore.getUser?.lastName || ''
    state.email = <string | undefined>authStore.getUser?.email || ''
    state.country =
      <string | undefined>authStore.getUser?.address?.country || ''
    state.city = <string | undefined>authStore.getUser?.address?.city || ''
    state.postalCode =
      <string | undefined>authStore.getUser?.address?.postalCode || ''
    state.addressLine1 =
      <string | undefined>authStore.getUser?.address?.addressLine1 || ''
    state.houseNumber =
      <string | undefined>authStore.getUser?.address?.houseNumber || ''
    state.apartmentNumber =
      <string | undefined>authStore.getUser?.address?.apartmentNumber || ''
    state.saveAddress = false
    state.agreeToTerms = false
    state.created_at = ''
    state.orderDetails = <{ id: number }[]>[]
    state.totalPrice = 0
    state.error = ''
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
