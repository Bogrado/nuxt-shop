<script setup lang="ts">
definePageMeta({
  middleware: 'authorized',
})

const { clearError } = useAuth()
const loadingStore = useLoadingStore()
const loading = computed(() => loadingStore.loading)

onMounted(() => {
  clearError()
})
</script>
<template>
  <div class="min-h-screen flex justify-center">
    <div v-auto-animate class="max-w-md w-full space-y-8">
      <pages-v-page-header
        title="Создайте учетную запись или войдите в аккаунт"
      />
      <forms-register-form
        :loading="loading"
        @switch-to="navigateTo('/auth_user/login')"
      />
    </div>
  </div>
</template>

<!--@handle-submit="handleRegister($event)"-->
