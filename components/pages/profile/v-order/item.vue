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
  id: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <nuxt-link :to="`/product/${slug}_${id}`">
    <div
      v-auto-animate
      class="border border-gray-200 rounded-lg p-1 shadow-2xl"
    >
      <img
        :src="image"
        alt="Product Image"
        class="w-10 h-10 sm:w-20 sm:h-20 object-contain rounded-lg"
      />
    </div>
  </nuxt-link>
</template>
