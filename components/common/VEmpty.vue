<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  action: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-center mt-20 mb-20 sm:mt-40 sm:mb-40 text-center"
  >
    <img :src="image" alt="Empty" class="mb-4 w-72 h-72 object-cover" />
    <h1 class="text-2xl font-semibold mb-2">{{ title }}</h1>
    <p class="text-gray-600 mb-4 flex items-center">
      {{ description }}
    </p>
    <NuxtLink to="/catalog">
      <button
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
      >
        {{ action }}
      </button>
    </NuxtLink>
  </div>
</template>
