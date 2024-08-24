import { email, minLength, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import type { Credentials } from '~/types'

export const useLoginForm = () => {
  const { login, error, user } = useAuth()
  const state = reactive({
    email: '',
    password: '',
    rememberMe: false,
  })

  const rules = {
    email: { required, email },
    password: { required, minLength: minLength(5) },
  }

  const v$ = useVuelidate(rules, state)

  const handleLogin = async (credentials: Credentials) => {
    await login(credentials)
    if (!error.value && user.value) {
      navigateTo('/catalog')
    }
  }

  return {
    state,
    error,
    handleLogin,
    v$,
  }
}
