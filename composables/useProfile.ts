import type { OrderData } from '~/types'

export const useProfile = () => {
  const { user } = useAuth()
  const { data, status } = useFetch<OrderData[]>('/api/orders/orders', {
    params: { user_id: user.value?.id },
  })

  return { data, status }
}
