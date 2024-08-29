<template>
  <div class="bg-white p-4 rounded-lg shadow-md max-w-xs w-full">
    <div class="relative border border-gray-200 rounded-lg group">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-64 object-contain rounded"
      />
      <div
        class="absolute top-2 right-2 flex items-center justify-center bg-white p-1 rounded-md shadow hover:shadow-md"
        @click="handleAddToFavorite"
      >
        <icons-v-like
          class="w-6 h-6 hover:fill-gray-700"
          :class="{ 'fill-red-700': isFavorite }"
        />
      </div>
      <nuxt-link :to="`/product/${product.slug}-${product.id}`">
        <button
          class="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 text-white py-1 text-center opacity-0 group-hover:opacity-70 transition-opacity duration-300 backdrop-blur-sm hover:bg-opacity-75 active:bg-opacity-90 rounded-b-md"
        >
          Подробнее
        </button>
      </nuxt-link>
    </div>
    <div class="mt-4">
      <nuxt-link :to="`/product/${product.slug}-${product.id}`">
        <h3
          class="text-lg font-bold line-clamp-1 text-ellipsis overflow-hidden"
        >
          {{ product.title }}
        </h3>
        <p class="text-xl font-semibold">{{ product.price }} ₽</p>
        <p class="text-gray-500">{{ product.category }}</p>
      </nuxt-link>
      <div class="flex items-center mt-2">
        <span class="text-yellow-500">★</span>
        <span class="ml-2 text-gray-700">{{ product.rate }}</span>
        <span class="ml-1 text-gray-500"> • {{ product.count }} оценок </span>
      </div>
      <common-v-cart-manager
        :isInCart="isInCart"
        :loading="loading"
        :quantity="quantity"
        @on-add-to-cart="handleAddToCart"
        @on-remove-from-cart="handleRemoveFromCart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '~/types'

const props = defineProps<{
  product: Item
}>()
const emit = defineEmits(['onAddToCart', 'onRemoveFromCart', 'onFavoriteClick'])

const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()
const isInCart = computed(
  () => cartStore.itemIds.includes(props.product.id) || false
)
const isFavorite = computed(() =>
  favoriteStore.products.some(product => product.id == props.product.id)
)
const quantity = computed(() => cartStore.itemQuantity(props.product.id) || 0)
const loading = computed(() => cartStore.itemLoading(props.product.id))
const handleAddToCart = () => emit('onAddToCart', props.product.id)
const handleRemoveFromCart = () => emit('onRemoveFromCart', props.product.id)
const handleAddToFavorite = () => emit('onFavoriteClick', props.product.id)
</script>
