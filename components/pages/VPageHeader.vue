<template>
  <h1 class="text-4xl font-bold mb-8">{{ title }}</h1>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
