<script setup>
defineProps({
  error: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <img
      src="/public/images/404.png"
      alt="Empty Cart"
      class="mb-4 w-72 h-72 object-cover"
    />
    <h1 class="text-2xl font-semibold mb-2">OOPS Page Not Found...</h1>
    <p class="text-gray-600 mb-4">
      {{ error.statusCode || 'unexpected error' }}
    </p>
    <p class="text-gray-600 mb-4">
      {{ error.message }}
    </p>
    <div class="flex justify-center gap-4">
      <NuxtLink to="/">
        <button
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
        >
          Перейти в каталог
        </button>
      </NuxtLink>
      <slot name="button" />
    </div>
  </div>
</template>

<style scoped></style>
