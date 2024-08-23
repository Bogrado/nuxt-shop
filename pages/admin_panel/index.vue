<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const router = useRouter()
onMounted(() => {
  router.push('/admin_panel/dashboard')
})
</script>

<template>
  <div>Hello</div>
</template>

<style scoped></style>
