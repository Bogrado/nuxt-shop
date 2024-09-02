<script setup lang="ts">
import type { OrderData } from '~/types'

const { logout, user } = useAuth()
const loadingStore = useLoadingStore()
const modalStore = useModalStore()
const loading = computed(() => loadingStore.loading)

const handleLogout = async () => {
  await logout()
  navigateTo('/catalog')
}

const { data, status } = useFetch<OrderData[]>('/api/orders/orders', {
  params: { user_id: user.value?.id },
})
console.log(data.value)
const orders = computed(() => (data.value as OrderData[]) || [])
</script>

<template>
  <div v-if="user">
    <pages-v-page-header :title="`Профиль пользователя ${user.nickName}`" />

    <div class="container mx-auto p-4 bg-gray-200 rounded-lg min-h-screen">
      <!-- Profile Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- User Image -->
        <lazy-pages-profile-v-image />
        <!-- User Info -->
        <lazy-pages-profile-v-info />
      </div>

      <!-- Orders Section -->
      <client-only>
        <div v-auto-animate>
          <common-v-preloader v-if="status === 'pending'" />
          <lazy-pages-profile-v-orders-list
            v-if="status === 'success'"
            :orders="orders"
          />
        </div>
      </client-only>
    </div>
  </div>
</template>
