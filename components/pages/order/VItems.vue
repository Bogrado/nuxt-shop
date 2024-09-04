<script setup lang="ts">
import type { OrderDetails } from '~/types'

defineProps<{
  orderDetails: OrderDetails[]
}>()
</script>

<template>
  <div class="mt-4 bg-white p-4 rounded-lg shadow-sm">
    <h3 class="text-lg font-semibold">Товары: {{ orderDetails.length }}</h3>
    <div class="flex space-x-4 mt-4 overflow-x-auto justify-center">
      <pages-order-v-items-list :items="orderDetails" />
    </div>
  </div>
</template>

<style scoped></style>
