import { email, minLength, required, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export const useRegisterForm = () => {
  const { register, error } = useAuth()
  const state = reactive({
    nickName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const rules = {
    nickName: { required, minLength: minLength(3) },
    email: { required, email },
    password: { required, minLength: minLength(5) },
    confirmPassword: {
      required,
      sameAs: sameAs(computed(() => state.password)),
    },
  }

  const handleRegister = async (credentials: any) => {
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
