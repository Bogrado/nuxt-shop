export const useAuth = () => {
  const authStore = useAuthStore()
  const { mergeAnonCartWithUserCart, loadUserCart } = useCartStore()
  const { loadUserFavorites } = useFavoriteStore()
  const register = async (userData: Record<string, never>) =>
    await authStore.register(userData)

  const login = async (credentials: {
    email: string
    password: string
    rememberMe?: boolean
  }) => {
    const userData = await authStore.login(credentials)
    if (userData) {
      await mergeAnonCartWithUserCart()
      await loadUserCart()
      await loadUserFavorites()
    }
  }

  const logout = async () => await authStore.logout()

  const fetchUser = async () => await authStore.fetchUser()

  const clearError = () => authStore.clearError()

  const user = computed(() => authStore.getUser)
  const error = computed(() => authStore.error)

  return { user, register, login, logout, fetchUser, error, clearError }
}
