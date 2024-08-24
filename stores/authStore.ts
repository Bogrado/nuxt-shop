import type { ApiResponse, Credentials, User, UserData } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig()
  const { setLoading } = useLoadingStore()
  const { loadAnonCartFromServer, initSessionId, state } = useCartStore()
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)

  const setUser = (userData: User | null) => {
    user.value = userData
  }

  const clearError = () => (error.value = null)

  const register = async (userData: UserData) => {
    clearError()
    setLoading(true)
    try {
      const response = await $fetch<ApiResponse>('/api/auth/register', {
        method: 'POST',
        body: userData,
      })
      return response
    } catch (err: unknown) {
      const e = err as {
        data?: { message?: string }
      }
      error.value = e.data?.message || 'Registration failed'
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials: Credentials) => {
    clearError()
    setLoading(true)
    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials,
      })
      const data: User = await $fetch('/api/auth/auth_me', { method: 'GET' })
      setUser(data)
      return data
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
        return data
      } catch (e) {
        await logout()
      } finally {
        /* empty */
      }
    } else if (!state.sessionId) {
      initSessionId()
      await loadAnonCartFromServer()
    }
  }

  const getUser = computed(() => user.value)

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
