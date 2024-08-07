<script setup lang="ts">
import type { CartItem } from '~/types'
defineProps<{
  products: CartItem[]
}>()

const cartStore = useCartStore()
</script>

<template>
  <div class="flex-1" v-auto-animate>
    <pages-cart-v-product
      v-for="product in products"
      :key="product.id"
      :product="product"
      @click-increase="cartStore.addItem(product.id)"
      @click-decrease="cartStore.removeItem(product.id)"
      @click-delete="cartStore.removeAll(product.id)"
    />
  </div>
</template>
