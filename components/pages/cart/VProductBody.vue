<script setup lang="ts">
import type { Item } from '~/types.js'

defineProps<{
  product: Item
}>()
</script>

<template>
  <div>
    <nuxt-link :to="`/product/${product.slug}_${product.id}`">
      <h3 class="text-lg font-bold line-clamp-1 text-ellipsis overflow-hidden">
        {{ product.title }}
      </h3>
    </nuxt-link>
    <p class="text-gray-700">Категория: {{ product.category }}</p>
    <p class="text-gray-700 flex items-center">
      Рейтинг: {{ product.rate ? product.rate : 0 }}
      <icons-v-star class="w-4 h-4" />
    </p>
    <p class="text-gray-700">
      Количество оценок: {{ product.count ? product.count : 0 }}
    </p>
  </div>
</template>
