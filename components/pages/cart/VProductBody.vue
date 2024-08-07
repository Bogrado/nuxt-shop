<script setup lang="ts">
import type { Item } from '~/types.js'

defineProps<{
  product: Item
}>()
</script>

<template>
  <div>
    <h3 class="text-lg font-bold">{{ product.title }}</h3>
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
