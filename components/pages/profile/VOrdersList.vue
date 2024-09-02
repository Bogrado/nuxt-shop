<script setup lang="ts">
import type { OrderData } from '~/types'

const props = defineProps<{
  orders: OrderData[]
}>()

const reversedOrders = computed(() => [...props.orders].reverse())
</script>
<template>
  <div class="mx-auto">
    <div class="mt-8">
      <h2
        class="text-2xl text-white font-semibold mb-4 p-4 bg-slate-800 rounded-lg"
      >
        Заказы
      </h2>
      <pages-profile-v-order
        v-for="order in reversedOrders"
        :key="order.id"
        :order="order"
      />
    </div>
  </div>
</template>
