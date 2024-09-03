<script setup lang="ts">
import type { OrderData } from '~/types'

const props = defineProps<{
  order: OrderData
}>()
const date = computed(() => props.order.created_at)
const formattedDate = formatDate(date.value)
</script>
<template>
  <div class="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium">Заказ от {{ formattedDate }}</h3>
        <a href="#" class="text-blue-500 text-sm"> # {{ order.id }}</a>
      </div>
      <div class="text-lg font-semibold text-right">
        Стоимость <span class="text-green-500">{{ order.totalPrice }} ₽</span>
      </div>
    </div>
    <div
      class="mt-2 flex flex-col md:flex-row justify-between items-start md:items-center"
    >
      <pages-profile-v-order-status :status="order.status" />
      <pages-profile-v-order-items-list :items="order.orderDetails" />
    </div>
  </div>
</template>
