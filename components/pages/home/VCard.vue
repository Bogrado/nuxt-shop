<template>
  <div class="bg-white p-4 rounded-lg shadow-md max-w-xs w-full">
    <div class="relative border border-gray-200 rounded-lg">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-64 object-contain rounded"
      />
      <div
        class="absolute top-2 right-2 flex items-center justify-center bg-white p-1 rounded-md shadow hover:shadow-md"
        @click="handleAddToFavorite"
      >
        <icons-v-like
          class="w-6 h-6 hover:fill-gray-700"
          :class="{ 'fill-red-700': isFavorite }"
        /><!-- Сердечко или пустой квадрат -->
      </div>
    </div>
    <div class="mt-4">
      <h3 class="text-lg font-bold line-clamp-1 text-ellipsis overflow-hidden">
        {{ product.title }}
      </h3>
      <p class="text-xl font-semibold">{{ product.price }} ₽</p>
      <p class="text-gray-500">{{ product.category }}</p>
      <div class="flex items-center mt-2">
        <span class="text-yellow-500">★</span>
        <span class="ml-2 text-gray-700">{{ product.rate }}</span>
        <span class="ml-1 text-gray-500"> • {{ product.count }} оценок </span>
      </div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['onAddToCart', 'onRemoveFromCart', 'onFavoriteClick'])

const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()
const isInCart = computed(
  () => cartStore.itemIds.includes(props.product.id) || false
)
const isFavorite = computed(() =>
  favoriteStore.products.some(product => product.id == props.product.id)
)
const quantity = computed(() => cartStore.itemQuantity(props.product.id) || 0)
const loading = computed(() => cartStore.itemLoading(props.product.id))
const handleAddToCart = () => emit('onAddToCart', props.product.id)
const handleRemoveFromCart = () => emit('onRemoveFromCart', props.product.id)
const handleAddToFavorite = () => emit('onFavoriteClick', props.product.id)
</script>
