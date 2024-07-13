<template>
  <section
    class="mb-12 px-4 py-12 text-center border border-gray-300 rounded-lg shadow-md bg-gray-200"
  >
    <h2 class="text-3xl font-bold mb-4 text-gray-900">{{ title }}</h2>
    <div class="flex flex-wrap justify-center gap-4">
      <pages-home-v-card
        v-for="(product, index) in products"
        :key="index"
        :image="product.image"
        :title="product.title"
        :description="product.description"
      />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
})
</script>
