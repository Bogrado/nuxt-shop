<script setup lang="ts">
import type { OrderData } from '~/types'

const { data, status, error } = useProfile()
const orders = computed(() => (data.value as OrderData[]) || [])
</script>
<template>
  <div v-auto-animate>
    <div class="min-h-[3rem]" />
    <h2
      class="text-2xl text-white font-semibold mb-4 mt-4 p-4 bg-slate-800 rounded-lg"
    >
      Заказы
    </h2>
    <common-v-preloader v-if="status === 'pending'" />
    <lazy-pages-profile-v-orders-list
      v-if="status === 'success' && orders"
      :orders="orders"
    />
    <lazy-common-v-empty
      v-if="status === 'success' && !orders.length"
      title="Ваш список заказов пока пуст"
      description="Оформите заказ и он появится здесь"
      image="/_nuxt/assets/static/file.png"
      action="За покупками"
    />
    <lazy-pages-error-v-error
      v-if="error || status === 'error'"
      :error="error"
    />
  </div>
</template>

<style scoped></style>
