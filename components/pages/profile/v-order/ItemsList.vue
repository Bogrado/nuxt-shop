<script setup lang="ts">
import type { OrderDetails } from '~/types'

const props = defineProps<{
  items: OrderDetails[]
}>()

const visibleItems = computed(() => props.items.slice(0, 3))
const remainingItemsCount = computed(() => props.items.length - 3)
</script>
<template>
  <div class="gap-2 flex flex-wrap sm:flex-nowrap">
    <pages-profile-v-order-item v-for="item in visibleItems" :key="item.id" />
    <div v-if="items.length > 4" class="flex items-center text-gray-500">
      + ещё {{ remainingItemsCount }}
    </div>
  </div>
</template>
