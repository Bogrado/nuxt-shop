<script setup lang="ts">
const { user } = useAuth()
</script>

<template>
  <div v-if="user">
    <pages-v-page-header :title="`Профиль пользователя ${user.nickName}`" />
  </div>
</template>

<style scoped></style>
