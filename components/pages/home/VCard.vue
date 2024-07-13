<template>
  <div
    class="bg-white p-4 rounded shadow-md max-w-xs w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
  >
    <div class="w-full h-40 mb-4">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover rounded"
      />
    </div>
    <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
    <p class="text-gray-700">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>
