import type { ApiResponse, Credentials, User, UserData } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)

  const setUser = (userData: User | null) => {
    user.value = userData
  }

  const clearError = () => (error.value = null)

  const register = async (userData: UserData) => {
    try {
      return <ApiResponse>await $fetch<ApiResponse>('/api/auth/register', {
        method: 'POST',
        body: userData,
      })
    } catch (err: unknown) {
      const e = err as {
        data?: { message?: string }
      }
      error.value = e.data?.message || 'Registration failed'
    }
  }

  const login = async (credentials: Credentials) => {
    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials,
      })
      return <User | null>await $fetch('/api/auth/auth_me', { method: 'GET' })
    } catch (err: unknown) {
      const e = err as {
        data?: { message?: string }
      }
      error.value = e.data?.message || 'Login failed'
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } catch (err: unknown) {
      const e = err as {
        message?: string
      }
      error.value = e.message || 'Logout failed'
    }
  }

  const fetchUser = async () => {
    try {
      return <User | null>await $fetch('/api/auth/auth_me', {
        method: 'GET',
        headers: useRequestHeaders(['cookie']) as HeadersInit,
      })
    } catch (err: unknown) {
      const e = err as {
        data?: { message?: string }
      }
      error.value = e.data?.message || 'Fetch user failed'
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
