<script setup lang="ts">
import type { Item } from '~/types'

defineProps<{
  products: Item[]
}>()

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const { user } = useAuth()

const toggleFavorite = (id: number) => {
  if (!user.value?.id) {
    navigateTo('/auth_user/login')
    return
  }
  favoriteStore.toggleFavorite(id)
}
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
      @click-favorite="toggleFavorite(product.id)"
    />
  </div>
</template>
