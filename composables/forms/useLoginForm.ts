import { email, minLength, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export const useLoginForm = () => {
  const { error } = useAuth()
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

  return {
    state,
    error,
    v$,
  }
}
