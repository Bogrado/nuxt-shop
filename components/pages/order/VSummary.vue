<script setup lang="ts">
defineProps({
  info: {
    type: String,
    default: '',
  },
  infoKey: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="font-semibold flex gap-2">
    {{ infoKey }}
    <p class="text-green-500">{{ info }}₽</p>
  </div>
</template>

<style scoped></style>
