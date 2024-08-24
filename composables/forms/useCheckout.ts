import { useOrderStore } from '@/stores/orderStore'
import {
  email,
  maxLength,
  minLength,
  numeric,
  required,
} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export const useCheckout = () => {
  const orderStore = useOrderStore()
  const state = orderStore.state

  const rules = {
    firstName: { required, minLength: minLength(3) },
    lastName: { required },
    email: { required, email, minLength: minLength(5) },
    country: { required, minLength: minLength(3) },
    city: { required, minLength: minLength(3) },
    postalCode: {
      required,
      numeric,
      minLength: minLength(6),
      maxLength: maxLength(6),
    },
    addressLine1: { required, minLength: minLength(3) },
    houseNumber: { required },
    apartmentNumber: { required },
  }

  const v$ = useVuelidate(rules, state)

  const handleCheckout = async () => {
    await orderStore.submitOrder()
  }

  const isFormValid = computed(() => !v$.value.$invalid && state.agreeToTerms)

  return {
    state,
    error: computed(() => state.error),
    v$,
    isFormValid,
    handleCheckout,
  }
}
