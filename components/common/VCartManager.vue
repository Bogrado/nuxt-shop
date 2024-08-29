<script setup lang="ts">
defineProps({
  isInCart: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['onAddToCart', 'onRemoveFromCart'])
const handleAddToCart = () => emit('onAddToCart')
const handleRemoveFromCart = () => emit('onRemoveFromCart')
</script>

<template>
  <client-only>
    <div v-auto-animate>
      <div
        v-if="isInCart && !loading"
        class="border-2 border-blue-600 text-blue-600 py-0.5 px-6 rounded-2xl hover:border-blue-900 hover:text-blue-900 hover:bg-blue-100 transition duration-300 min-w-40 flex justify-center items-center"
      >
        <common-v-quantity-manager
          :quantity="quantity"
          @on-click-decrease="handleRemoveFromCart"
          @on-click-increase="handleAddToCart"
        />
      </div>
      <button
        v-else-if="loading"
        class="border-2 border-blue-600 text-blue-600 py-1.5 px-6 rounded-2xl hover:border-blue-900 hover:text-blue-900 hover:bg-blue-100 transition duration-300 active:bg-green-700 w-full flex justify-center items-center"
      >
        <v-preloader class="w-6 h-6" />
      </button>
      <button
        v-else
        class="border-2 border-blue-600 text-blue-600 py-1.5 px-6 rounded-2xl hover:border-blue-900 hover:text-blue-900 hover:bg-blue-100 transition duration-300 active:bg-green-700 w-full flex justify-center items-center"
        @click="handleAddToCart"
      >
        Купить
      </button>
    </div>
  </client-only>
</template>
