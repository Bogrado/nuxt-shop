<script setup lang="ts">
definePageMeta({
  middleware: 'check-auth',
})
</script>

<template>
  <div>
    <!-- Заголовок страницы -->
    <pages-v-page-header title="Избранное" />
  </div>
</template>
