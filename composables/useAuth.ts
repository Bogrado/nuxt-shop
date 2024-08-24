import type { Credentials, UserData } from '~/types'

export const useAuth = () => {
  const authStore = useAuthStore()
  const { mergeAnonCartWithUserCart, loadUserCart, clearCart } = useCartStore()
  const { loadUserFavorites, clearFavorites } = useFavoriteStore()
  const { createCartForUser, createFavoritesForUser } = useUserSetup()

  const register = async (userData: UserData) => {
    const response = await authStore.register(userData)
    if (response?.data.id) {
      await createCartForUser(response?.data.id)
      await createFavoritesForUser(response?.data.id)
    }
  }

  const login = async (credentials: Credentials) => {
    const userData = await authStore.login(credentials)
    if (userData) {
      await mergeAnonCartWithUserCart()
      await loadUserCart()
      await loadUserFavorites()
    }
  }

  const logout = async () => {
    await authStore.logout()
    if (!authStore.user) {
      await clearCart()
      await clearFavorites()
    }
  }

  const fetchUser = async () => {
    const userData = await authStore.fetchUser()
    if (userData) {
      await mergeAnonCartWithUserCart()
      await loadUserCart()
      await loadUserFavorites()
    }
  }

  const clearError = () => authStore.clearError()

  const user = computed(() => authStore.getUser)
  const error = computed(() => authStore.error)

  return { user, register, login, logout, fetchUser, error, clearError }
}
