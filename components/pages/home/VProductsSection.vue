<template>
  <div
    v-auto-animate
    class="w-full sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 bg-gray-200 flex flex-col items-center justify-center rounded-b-lg"
  >
    <pages-home-v-card
      v-for="product in products"
      :key="product.id"
      :product="product"
      @on-add-to-cart="cartStore.addItem($event)"
      @on-remove-from-cart="cartStore.removeItem($event)"
      @on-favorite-click="toggleFavorite($event)"
    />
  </div>
</template>

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
