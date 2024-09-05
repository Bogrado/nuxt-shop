import type { Credentials, UserData, UserUpdateBody } from '~/types'

export const useAuth = () => {
  const authStore = useAuthStore()
  const {
    mergeAnonCartWithUserCart,
    loadUserCart,
    clearCart,
    loadAnonCartFromServer,
  } = useCartStore()
  const { loadUserFavorites, clearFavorites } = useFavoriteStore()
  const { createCartForUser, createFavoritesForUser } = useUserSetup()
  const { setLoading } = useLoadingStore()
  const config = useRuntimeConfig()

  const register = async (userData: UserData) => {
    setLoading(true)
    authStore.clearError()
    try {
      const response = await authStore.register(userData)
      if (response?.data.id) {
        await createCartForUser(response?.data.id)
        await createFavoritesForUser(response?.data.id)
      }
    } catch (e) {
      handleFetchError(e)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials: Credentials) => {
    setLoading(true)
    authStore.clearError()
    try {
      const userData = await authStore.login(credentials)
      if (userData) {
        authStore.setUser(userData)
        await mergeAnonCartWithUserCart()
        await loadUserCart()
        await loadUserFavorites()
      }
    } catch (e) {
      handleFetchError(e)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    authStore.clearError()
    try {
      await authStore.logout()
      authStore.setUser(null)
      if (!authStore.user) {
        await clearCart()
        await clearFavorites()
      }
    } catch (e) {
      handleFetchError(e)
    } finally {
      setLoading(false)
    }
  }

  const fetchUser = async () => {
    authStore.clearError()
    const token = useCookie(config.public.cookieName)
    if (!user.value && token.value) {
      try {
        const userData = await authStore.fetchUser()
        if (userData) {
          authStore.setUser(userData)
          await mergeAnonCartWithUserCart()
          await loadUserCart()
          await loadUserFavorites()
        }
        return userData
      } catch (e) {
        await logout()
        handleFetchError(e)
      }
    } else if (!sessionId.value) {
      authStore.initSessionId()
      await loadAnonCartFromServer()
    }
  }

  const patchUser = async (id: number, body: UserUpdateBody) => {
    setLoading(true)
    authStore.clearError()
    try {
      await authStore.patchUser(id, body)
      const userData = await authStore.fetchUser()
      if (userData) {
        authStore.setUser(userData)
      }
    } catch (e) {
      handleFetchError(e)
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => authStore.clearError()

  const user = computed(() => authStore.getUser)
  const error = computed(() => authStore.error)
  const sessionId = computed(() => authStore.getAnonSessionId)

  return {
    user,
    register,
    login,
    logout,
    fetchUser,
    patchUser,
    error,
    clearError,
  }
}
