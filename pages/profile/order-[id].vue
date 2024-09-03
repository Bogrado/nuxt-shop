<script setup lang="ts">
import { useRoute } from 'vue-router'

const { user } = useAuth()
const route = useRoute()
const orderId = route.params.id

const { data } = await useFetch('/api/orders/orders', {
  params: { user_id: user.value?.id, id: orderId },
})
const order = computed(() => data.value?.[0])
const formattedDate = computed(() => formatDate(order.value?.created_at))
</script>

<template>
  <div>
    <nuxt-link to="/profile/orders" class="text-blue-500"
      >&larr; К списку заказов
    </nuxt-link>
    <h2
      class="text-2xl text-white font-semibold mb-4 mt-4 p-4 bg-slate-800 rounded-lg"
    >
      Заказ #{{ order?.id }}
    </h2>
    <p class="text-gray-500">от {{ formattedDate }}</p>
    <div
      class="mt-4 flex flex-col md:flex-row justify-between items-start bg-gray-100 p-4 rounded-lg shadow-sm"
    >
      <div class="md:mr-4">
        <div class="mb-4">
          <h3 class="text-lg font-semibold">Доставка по адресу</h3>
          <p>{{ order?.address }}</p>
        </div>
        <div class="mb-4">
          <h3 class="text-lg font-semibold">Получатель</h3>
          <p>{{ order?.fullName }}</p>
          <p>{{ order?.user }}</p>
        </div>
        <div class="mb-4">
          <h3 class="text-lg font-semibold">Статус</h3>
          <span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{{
            order?.status
          }}</span>
        </div>
      </div>

      <!-- Этот блок будет ниже на малых экранах -->
      <div class="bg-white p-4 rounded-lg shadow-sm mt-4 md:mt-0">
        <h3 class="text-lg font-semibold">Суммарная стоимость</h3>
        <div class="mt-2">
          <p class="font-semibold">Товары: {{ order?.totalPrice }} ₽</p>
          <p class="font-semibold">Доставка: Бесплатно</p>
          <p class="font-semibold mt-2">Итого: {{ order?.totalPrice }} ₽</p>
        </div>
      </div>
    </div>

    <div class="mt-4 bg-white p-4 rounded-lg shadow-sm">
      <h3 class="text-lg font-semibold">
        Товары: {{ order?.orderDetails.length }}
      </h3>
      <div class="flex space-x-4 mt-4 overflow-x-auto justify-center">
        <div
          v-for="(item, index) in order?.orderDetails"
          :key="index"
          class="flex-shrink-0 flex items-center space-x-4"
        >
          <img
            :src="item.image"
            alt="Product Image"
            class="w-20 h-20 object-cover rounded"
          />
          <div>
            <h4
              class="font-semibold line-clamp-1 text-ellipsis overflow-hidden"
            >
              {{ item.name }}
            </h4>
            <p class="text-sm text-gray-500">
              Производитель: {{ item.manufacturer }}
            </p>
            <p class="text-sm text-gray-500">Цвет: {{ item.color }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
