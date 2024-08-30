<script setup lang="ts">
const router = useRouter()
onMounted(() => {
  router.push('/catalog')
})
</script>

<template>
  <lazy-common-v-preloader />
</template>
