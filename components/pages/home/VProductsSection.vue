<template>
  <div
    class="w-full sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 bg-gray-200 flex flex-col items-center justify-center"
  >
    <pages-home-v-card
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    required: true,
  },
})
</script>
