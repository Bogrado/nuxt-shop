<template>
  <h1 class="text-2xl font-bold mb-8 sm:text-4xl">{{ title }}</h1>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
