<script setup lang="ts">
import type { OrderDetails } from '~/types'

const props = defineProps<{
  items: OrderDetails[]
}>()
const { products, loading, loadOrderProducts } = useUserOrders()

const itemIds = computed(() => props.items.map(item => item.id))
const getLoading = computed(() => loading.value || !products.value)
onMounted(() => loadOrderProducts(itemIds.value))
</script>
<template>
  <div class="gap-2 flex flex-wrap justify-center">
    <div
      v-if="getLoading"
      class="w-10 h-10 sm:w-20 sm:h-20 bg-gray-300 animate-pulse rounded p-1"
    />
    <pages-profile-v-order-item
      v-for="item in products"
      :id="item.id"
      :key="item.id"
      :slug="item.slug"
      :image="item.image"
      :loading="getLoading"
    />
  </div>
</template>
