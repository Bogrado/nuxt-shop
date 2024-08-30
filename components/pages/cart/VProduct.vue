<script setup lang="ts">
import type { Item } from '~/types'

const props = defineProps<{
  product: Item
}>()

const emit = defineEmits([
  'clickDecrease',
  'clickIncrease',
  'clickDelete',
  'clickFavorite',
])

const cartStore = useCartStore()
const quantity = computed(() => cartStore.itemQuantity(props.product.id))
const loadingItem = computed(() => cartStore.itemLoading(props.product.id))
const itemTotalAmount = computed(() =>
  (quantity.value * props.product.price).toFixed(2)
)
</script>

<template>
  <div v-auto-animate>
    <pages-cart-v-card-skeleton v-if="loadingItem" />
    <div
      v-else
      class="border-b py-4 flex flex-col md:flex-row justify-between items-start md:items-center"
    >
      <div class="flex items-center">
        <nuxt-link :to="`/product/${product.slug}_${product.id}`">
          <pages-cart-v-product-image :image="props.product.image" />
        </nuxt-link>
        <div class="ml-4">
          <pages-cart-v-product-body :product="props.product" />
          <pages-cart-v-product-bottom-bar
            :product="props.product"
            @handle-delete-click="emit('clickDelete')"
            @on-favorite-click="emit('clickFavorite')"
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
          @on-click-decrease="emit('clickDecrease')"
          @on-click-increase="emit('clickIncrease')"
        />
      </div>
    </div>
  </div>
</template>
