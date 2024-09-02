<script setup lang="ts">
import type { OrderData } from '~/types'

const props = defineProps<{
  orders: OrderData[]
}>()

const reversedOrders = computed(() => [...props.orders].reverse())
</script>
<template>
  <div class="mx-auto">
    <div class="mt-4">
      <pages-profile-v-order
        v-for="order in reversedOrders"
        :key="order.id"
        :order="order"
      />
    </div>
  </div>
</template>
