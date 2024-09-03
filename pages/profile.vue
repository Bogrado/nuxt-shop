<script setup lang="ts">
import type { OrderData } from '~/types'

definePageMeta({
  ssr: false,
})

const { logout, user } = useAuth()

const handleLogout = async () => {
  await logout()
  navigateTo('/catalog')
}

const { data, status } = useProfile()
const orders = computed(() => (data.value as OrderData[]) || [])
</script>

<template>
  <client-only>
    <div v-if="user">
      <pages-v-page-header :title="`Профиль пользователя ${user.nickName}`" />

      <div class="container mx-auto p-4 bg-gray-200 rounded-lg min-h-screen">
        <!-- Profile Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- User Image -->
          <lazy-pages-profile-v-image />
          <!-- User Info -->
          <lazy-pages-profile-v-info @handle-logout="handleLogout" />
        </div>

        <!-- Orders Section -->

        <div v-auto-animate>
          <h2
            class="text-2xl text-white font-semibold mb-4 mt-4 p-4 bg-slate-800 rounded-lg"
          >
            Заказы
          </h2>
          <common-v-preloader v-if="status === 'pending'" />
          <lazy-pages-profile-v-orders-list
            v-if="status === 'success'"
            :orders="orders"
          />
        </div>
      </div>
    </div>
  </client-only>
</template>
