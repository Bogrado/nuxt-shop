<script setup lang="ts">
definePageMeta({
  middleware: 'authorized',
})

const { login, clearError, error, user } = useAuth()
const loadingStore = useLoadingStore()
const loading = computed(() => loadingStore.loading)
const handleLogin = async (credentials: any) => {
  await login(credentials)
  if (!error.value && user.value) {
    navigateTo('/home')
  }
}

onMounted(() => {
  clearError()
})
</script>

<template>
  <div class="min-h-screen flex justify-center">
    <div v-auto-animate class="max-w-md w-full space-y-8">
      <pages-v-page-header title="Авторизация" />
      <forms-login-form
        :loading="loading"
        @handle-submit="handleLogin($event)"
      />
    </div>
  </div>
</template>
