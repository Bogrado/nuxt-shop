<script setup lang="ts">
const router = useRouter()

definePageMeta({
  ssr: false,
})

const { logout, user } = useAuth()

const handleLogout = async () => {
  await logout()
  navigateTo('/catalog')
}

// Проверяем маршрут и переходим к заказам, если маршрут основной
// onMounted(() => {
//   if (router.currentRoute.value.path === '/profile') {
//     router.push('/profile/orders')
//   }
// })
</script>

<template>
  <client-only>
    <div v-if="user">
      <!-- Заголовок страницы -->
      <pages-v-page-header :title="`Профиль пользователя ${user.nickName}`" />

      <div class="container mx-auto p-4 bg-gray-200 rounded-lg">
        <!-- Информация о пользователе -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <!-- User Image -->
          <lazy-pages-profile-v-image />
          <!-- User Info -->
          <lazy-pages-profile-v-info @handle-logout="handleLogout" />
        </div>

        <!-- Секция для заказов -->
        <div>
          <NuxtPage />
        </div>
      </div>
    </div>
  </client-only>
</template>
