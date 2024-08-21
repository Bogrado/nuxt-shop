<script setup lang="ts">
import type { Item } from '~/types'

defineProps<{
  products: Item[]
}>()

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
</script>

<template>
  <div v-auto-animate class="flex-1">
    <pages-cart-v-product
      v-for="product in products"
      :key="product.id"
      :product="product"
      @click-increase="cartStore.addItem(product.id)"
      @click-decrease="cartStore.removeItem(product.id)"
      @click-delete="cartStore.removeAll(product.id)"
      @click-favorite="favoriteStore.toggleFavorite(product.id)"
    />
  </div>
</template>
