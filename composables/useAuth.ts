export const useAuth = () => {
  const authStore = useAuthStore()

  const register = async (userData: Record<string, never>) =>
    await authStore.register(userData)

  const login = async (credentials: {
    email: string
    password: string
    rememberMe?: boolean
  }) => await authStore.login(credentials)

  const logout = async () => await authStore.logout()

  const fetchUser = async () => await authStore.fetchUser()

  const clearError = () => authStore.clearError()

  const user = computed(() => authStore.getUser)
  const error = computed(() => authStore.error)

  return { user, register, login, logout, fetchUser, error, clearError }
}
