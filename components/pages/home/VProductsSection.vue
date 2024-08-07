<template>
  <div
    class="w-full sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 bg-gray-200 flex flex-col items-center justify-center"
  >
    <pages-home-v-card
      v-for="product in products"
      :key="product.id"
      :product="product"
      @on-add-to-cart="cartStore.addItem($event)"
      @on-remove-from-cart="cartStore.removeItem($event)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  products: {
    type: Array,
    required: true,
  },
})

const cartStore = useCartStore()
</script>
