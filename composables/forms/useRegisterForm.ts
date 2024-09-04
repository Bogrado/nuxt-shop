import {
  email,
  maxLength,
  minLength,
  required,
  sameAs,
} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import type { UserData } from '~/types'

export const useRegisterForm = () => {
  const { register, error } = useAuth()
  const state = reactive({
    nickName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const rules = {
    nickName: { required, minLength: minLength(3), maxLength: maxLength(10) },
    email: { required, email },
    password: { required, minLength: minLength(5) },
    confirmPassword: {
      required,
      sameAs: sameAs(computed(() => state.password)),
    },
  }

  const handleRegister = async (credentials: UserData) => {
    await register(credentials)
    if (!error.value) {
      navigateTo('/auth_user/login')
    }
  }

  const v$ = useVuelidate(rules, state)

  return {
    state,
    handleRegister,
    error,
    v$,
  }
}
