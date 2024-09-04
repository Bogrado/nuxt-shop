<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserOrders } from '~/composables/useUserOrders'

const { patchOrderStatus, loading } = useUserOrders()
const { user } = useAuth()
const route = useRoute()
const orderId = route.params.id
const confirm = ref(false)
const { data, status, refresh } = await useFetch('/api/orders/orders', {
  params: { user_id: user.value?.id, id: orderId },
})

const handleCancelOrder = async () => {
  await patchOrderStatus(order.value.id, 'canceled')
  await refresh()
  confirm.value = false
}
const order = computed(() => data.value?.[0])
const formattedDate = computed(() => formatDate(order.value?.created_at))
const isLoading = computed(() => loading.value)
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
              <pages-order-v-summary
                info-key="Товары"
                :info="String(order.totalPrice)"
              />
              <pages-order-v-summary info-key="Доставка" info="Бесплатно" />
              <pages-order-v-summary
                info-key="Итого"
                :info="String(order.totalPrice)"
              />
            </div>
          </template>
          <template #footer>
            <pages-order-v-cancel-section
              :loading="isLoading"
              :status="order?.status"
              :confirm="confirm"
              @handle-yes="handleCancelOrder"
              @handle-no="confirm = false"
              @handle-cancel-order="confirm = true"
            />
          </template>
        </common-v-summary>
      </div>
      <lazy-pages-order-v-items :order-details="order?.orderDetails" />
    </div>
  </div>
</template>
