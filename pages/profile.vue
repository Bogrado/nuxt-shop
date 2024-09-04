<script setup lang="ts">
definePageMeta({
  ssr: false,
})

const { logout, user } = useAuth()

const handleLogout = async () => {
  await logout()
  navigateTo('/catalog')
}
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
          <lazy-pages-profile-v-info
            :user="user"
            @handle-logout="handleLogout"
          />
        </div>

        <!-- Секция для заказов -->
        <div>
          <NuxtPage />
        </div>
      </div>
    </div>
  </client-only>
</template>
