<script setup lang="ts">
import { useRoute } from 'vue-router'

const modalStore = useModalStore()
const { user } = useAuth()
const route = useRoute()
const orderId = route.params.id

const { data, status, refresh } = await useFetch('/api/orders/orders', {
  params: { user_id: user.value?.id, id: orderId },
})

const handleCancelOrder = async () => {
  modalStore.openModal('cancelOrder', order.value?.id)
  setTimeout(() => {
    refresh()
  }, 3500)
}
const order = computed(() => data.value?.[0])
const formattedDate = computed(() => formatDate(order.value?.created_at))
</script>

<template>
  <div>
    <nuxt-link to="/profile/orders" class="block text-blue-500 min-h-[3rem]">
      К списку заказов
    </nuxt-link>
    <div v-if="status === 'success' && order">
      <h2
        class="text-2xl text-white font-semibold mb-4 mt-4 p-4 bg-slate-800 rounded-lg"
      >
        Заказ #{{ order?.id }}
      </h2>
      <p class="text-gray-500">от {{ formattedDate }}</p>
      <div
        class="mt-4 flex flex-col md:flex-row justify-between items-start bg-gray-100 p-4 rounded-lg shadow-sm"
      >
        <pages-profile-v-order-info :order="order" />
        <common-v-summary>
          <template #header
            ><h3 class="text-lg font-semibold">
              Суммарная стоимость
            </h3></template
          >
          <template #body>
            <div class="mt-2">
              <div class="font-semibold flex gap-2">
                Товары:
                <p class="text-green-500">{{ order?.totalPrice }}₽</p>
              </div>
              <div class="font-semibold flex gap-2">
                Доставка:
                <p class="text-green-500">Бесплатно</p>
              </div>
              <div class="font-semibold flex gap-2">
                Итого:
                <p class="text-green-500">{{ order?.totalPrice }} ₽</p>
              </div>
            </div>
          </template>
          <template #footer>
            <button
              v-if="order?.status !== 'canceled' && order?.status !== 'done'"
              class="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              @click="handleCancelOrder"
            >
              Отменить заказ
            </button>
          </template>
        </common-v-summary>
      </div>

      <div class="mt-4 bg-white p-4 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold">
          Товары: {{ order?.orderDetails.length }}
        </h3>
        <div class="flex space-x-4 mt-4 overflow-x-auto justify-center">
          <pages-order-v-items-list :items="order?.orderDetails" />
        </div>
      </div>
    </div>
  </div>
</template>
