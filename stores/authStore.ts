export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig()
  const { setLoading } = useLoadingStore()
  const { createCartForUser, createFavoritesForUser } = useUserSetup()
  const { loadUserCart, clearCart } = useCartStore()
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)

  interface ApiResponse {
    data: {
      id: number
    }
  }

  interface User {
    id: number
  }

  const setUser = (userData: User | null) => {
    user.value = userData
  }

  const getUser = computed(() => user.value)
  const clearError = () => (error.value = null)
  const register = async (userData: Record<string, never>) => {
    clearError()
    setLoading(true)
    try {
      const response = await $fetch<ApiResponse>('/api/auth/register', {
        method: 'POST',
        body: userData,
      })
      await createCartForUser(response?.data.id)
      await createFavoritesForUser(response?.data.id)
    } catch (err: unknown) {
      const e = err as {
        data?: { message?: string }
      }
      error.value = e.data?.message || 'Registration failed'
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials: {
    email: string
    password: string
    rememberMe?: boolean
  }) => {
    clearError()
    setLoading(true)
    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials,
      })
      const data: User = await $fetch('/api/auth/auth_me', { method: 'GET' })
      setUser(data)
      await loadUserCart()
    } catch (err: unknown) {
      const e = err as {
        data?: { message?: string }
      }
      error.value = e.data?.message || 'Login failed'
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    clearError()
    try {
      setLoading(true)
      await $fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      await clearCart()
    } catch (err: unknown) {
      const e = err as {
        message?: string
      }
      error.value = e.message || 'Logout failed'
    } finally {
      setLoading(false)
    }
  }

  const fetchUser = async () => {
    clearError()
    const token = useCookie(config.public.cookieName)
    if (!user.value && token.value) {
      try {
        const data: User = await $fetch('/api/auth/auth_me', {
          method: 'GET',
          headers: useRequestHeaders(['cookie']) as HeadersInit,
        })
        setUser(data)
        await loadUserCart()
      } catch (e) {
        await logout()
      } finally {
        /* empty */
      }
    }
  }

  return {
    user,
    setUser,
    getUser,
    register,
    login,
    logout,
    fetchUser,
    error,
    clearError,
  }
})
