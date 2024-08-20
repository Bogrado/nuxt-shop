<script setup lang="ts">
import type { Item } from '~/types'

const props = defineProps<{
  product: Item
}>()

const emit = defineEmits(['ClickDecrease', 'ClickIncrease', 'ClickDelete'])

const cartStore = useCartStore()
const quantity = computed(() => cartStore.itemQuantity(props.product.id))
const loadingItem = computed(() => cartStore.itemLoading(props.product.id))
const itemTotalAmount = computed(() =>
  (quantity.value * props.product.price).toFixed(2)
)
</script>

<template>
  <div v-auto-animate>
    <v-preloader v-if="loadingItem" class="w-20 h-20" />
    <pages-cart-v-card-skeleton v-else-if="!props.product.title" />
    <div
      v-else
      class="border-b py-4 flex flex-col md:flex-row justify-between items-start md:items-center"
    >
      <div class="flex items-center">
        <pages-cart-v-product-image :image="props.product.image" />
        <div class="ml-4">
          <pages-cart-v-product-body :product="props.product" />
          <pages-cart-v-product-bottom-bar
            @handle-delete-click="emit('ClickDelete')"
          />
        </div>
      </div>

      <div
        class="flex flex-col md:flex-row items-start md:items-center mt-4 md:mt-0 md:ml-auto"
      >
        <div class="text-right md:text-left mb-2 md:mb-0 md:mr-8">
          <p class="font-bold">{{ itemTotalAmount }} ₽</p>
        </div>
        <common-v-quantity-manager
          :quantity="quantity"
          @on-click-decrease="emit('ClickDecrease')"
          @on-click-increase="emit('ClickIncrease')"
        />
      </div>
    </div>
  </div>
</template>
