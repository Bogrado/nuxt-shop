<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <div v-auto-animate class="border border-gray-200 rounded-lg p-1 shadow-2xl">
    <img
      :src="image"
      alt="Product Image"
      class="w-10 h-10 sm:w-20 sm:h-20 object-contain rounded-lg"
    />
  </div>
</template>
