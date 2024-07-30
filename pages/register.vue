<template>
  <div class="min-h-screen flex justify-center">
    <div v-auto-animate class="max-w-md w-full space-y-8">
      <pages-v-page-header title="Авторизация" />
      <forms-register-form
        :loading="loading"
        @handle-submit="handleRegister($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({
//   middleware: 'authorized',
// })

const { register, clearError, error } = useAuth()
const loadingStore = useLoadingStore()
const loading = computed(() => loadingStore.loading)

const handleRegister = async (event: any) => {
  await register(event)
  if (!error.value) {
    navigateTo('/login')
  }
}

onMounted(() => {
  clearError()
})
</script>
