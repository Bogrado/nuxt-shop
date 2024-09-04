<script setup lang="ts">
import type { OrderData } from '~/types'

defineProps<{
  order: OrderData
}>()
</script>

<template>
  <div class="md:mr-4">
    <div class="mb-4">
      <h3 class="text-lg font-semibold">Доставка по адресу</h3>
      <p class="text-base sm:text-lg break-all max-w-full">
        {{ order?.address }}
      </p>
    </div>
    <div class="mb-4">
      <h3 class="text-lg font-semibold">Получатель</h3>
      <p class="text-base sm:text-lg break-all max-w-full">
        {{ order?.fullName }}
      </p>
      <p class="text-base sm:text-lg break-all max-w-full">{{ order?.user }}</p>
    </div>
    <div class="mb-4">
      <pages-profile-v-order-status
        class="text-lg font-semibold"
        :status="order?.status"
      />
    </div>
  </div>
</template>

<style scoped></style>
