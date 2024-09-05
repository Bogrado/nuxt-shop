<script setup lang="ts">
import type { OrderDetails } from '~/types'
const props = defineProps<{
  items: OrderDetails[]
}>()
const { products, loading, loadOrderProducts } = useUserOrders()

const itemIds = computed(() => props.items.map(item => item.id))
const visibleItems = computed(() =>
  products.value ? products.value.slice(0, 3) : []
)
const remainingItemsCount = computed(() =>
  products.value ? products.value.length - 3 : 0
)
const getLoading = computed(() => loading.value || !products.value)
onMounted(() => loadOrderProducts(itemIds.value))
</script>
<template>
  <div class="gap-2 flex flex-wrap sm:flex-nowrap">
    <div
      v-if="getLoading"
      class="w-10 h-10 sm:w-20 sm:h-20 bg-gray-300 animate-pulse rounded p-1"
    />
    <pages-profile-v-order-item
      v-for="item in visibleItems"
      :id="item.id"
      :key="item.id"
      :slug="item.slug"
      :image="item.image"
      :loading="getLoading"
    />
    <div v-if="items.length > 3" class="flex items-center text-gray-500">
      + ещё {{ remainingItemsCount }}
    </div>
  </div>
</template>
