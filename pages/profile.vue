<script setup lang="ts">
definePageMeta({
  middleware: 'check-auth',
})

const { logout, user } = useAuth()
const loadingStore = useLoadingStore()
const loading = computed(() => loadingStore.loading)

const handleLogout = async () => {
  await logout()
  navigateTo('/')
}
</script>

<template>
  <div v-if="user">
    <pages-v-page-header :title="`Профиль пользователя ${user.nickName}`" />

    <div class="w-full mt-4 flex justify-center">
      <div
        v-if="loading"
        class="w-full max-w-md mt-2 py-2 border border-gray-600 rounded text-gray-300 hover:bg-gray-700 transition"
      >
        <v-preloader />
      </div>
      <button
        v-else
        class="w-full max-w-md mt-2 py-2 border border-gray-600 rounded text-gray-300 hover:bg-gray-700 transition"
        @click="handleLogout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<style scoped></style>
