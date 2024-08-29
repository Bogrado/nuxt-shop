<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: false,
    default: 'assets/static/box.png',
  },
  isFavorite: {
    type: Boolean,
    required: false,
    default: false,
  },
})
defineEmits(['handle-favorite'])
</script>
<template>
  <div class="w-full lg:w-3/5 bg-white p-4 rounded-lg shadow-md lg:h-96">
    <div
      class="w-full h-80 bg-white flex items-center justify-center rounded-lg overflow-hidden relative"
    >
      <img
        :src="image"
        alt="Product Image"
        class="object-contain h-full w-full"
      />
      <div
        class="absolute top-2 right-2 flex items-center justify-center bg-white p-1 rounded-md shadow hover:shadow-md"
        @click="$emit('handle-favorite')"
      >
        <icons-v-like
          class="w-6 h-6 hover:fill-gray-700"
          :class="{ 'fill-red-700': isFavorite }"
        />
      </div>
    </div>
  </div>
</template>
