<script setup lang="ts">
import type { Item, OrderDetails } from '~/types'
import { denormalizeCartItems } from '~/utils/denormalizeCartItems'

const props = defineProps<{
  items: OrderDetails[]
}>()
const loading = ref(false)
const products = ref<Item[] | null>(null)
const itemsId = computed(() => props.items.map(item => item.id))
const loadOrderProducts = async () => {
  if (itemsId.value.length > 0) {
    loading.value = true
    console.log(loading.value)
    try {
      const response = await $fetch<Item[]>('/api/data/items', {
        params: {
          id: itemsId.value,
          _select: 'id,slug,image',
        },
      })
      products.value = denormalizeCartItems(response, itemsId.value)
    } catch (e) {
      handleFetchError(e)
    } finally {
      loading.value = false
      console.log(loading.value)
    }
  }
}

const visibleItems = computed(() =>
  products.value ? products.value.slice(0, 3) : []
)
const remainingItemsCount = computed(() =>
  products.value ? products.value.length - 3 : 0
)
const getLoading = computed(() => loading.value || !products.value)
onMounted(() => loadOrderProducts())
</script>
<template>
  <div class="gap-2 flex flex-wrap sm:flex-nowrap">
    <div
      v-if="getLoading"
      class="w-10 h-10 sm:w-20 sm:h-20 bg-gray-300 animate-pulse rounded p-1"
    />
    <pages-profile-v-order-item
      v-for="item in visibleItems"
      :key="item.id"
      :image="item.image"
      :loading="getLoading"
    />
    <div v-if="items.length > 4" class="flex items-center text-gray-500">
      + ещё {{ remainingItemsCount }}
    </div>
  </div>
</template>
