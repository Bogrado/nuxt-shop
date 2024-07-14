<template>
  <div class="bg-white p-4 rounded-lg shadow-md max-w-xs w-full">
    <div class="relative border border-gray-200 rounded-lg">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-64 object-contain rounded"
      />
      <div
        class="absolute top-2 right-2 w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
      >
        <!-- Сердечко или пустой квадрат -->
      </div>
    </div>
    <div class="mt-4">
      <h3 class="text-lg font-bold line-clamp-1 text-ellipsis overflow-hidden">
        {{ product.title }}
      </h3>
      <p class="text-xl font-semibold">{{ product.price }} ₽</p>
      <p class="text-gray-500">{{ product.category }}</p>
      <div class="flex items-center mt-2">
        <span class="text-yellow-500">★</span>
        <span class="ml-2 text-gray-700">{{ product.rating.rate }}</span>
        <span class="ml-1 text-gray-500">
          • {{ product.rating.count }} оценок
        </span>
      </div>
      <button
        class="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Купить
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>
