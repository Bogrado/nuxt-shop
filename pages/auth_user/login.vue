<script setup lang="ts">
definePageMeta({
  middleware: 'authorized',
})

const { clearError } = useAuth()
const loadingStore = useLoadingStore()
const loading = computed(() => loadingStore.loading)
// const handleLogin = async (credentials: any) => {
//   await login(credentials)
//   if (!error.value && user.value) {
//     navigateTo('/catalog')
//   }
// }

onMounted(() => {
  clearError()
})
</script>

<template>
  <div class="min-h-screen flex justify-center">
    <div v-auto-animate class="max-w-md w-full space-y-8">
      <pages-v-page-header title="Для продолжения необходимимо войти" />
      <forms-login-form
        :loading="loading"
        @switch-to="navigateTo('/auth_user/register')"
      />
    </div>
  </div>
</template>

<!--@handle-submit="handleLogin($event)"-->
