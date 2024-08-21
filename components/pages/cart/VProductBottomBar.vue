<script setup>
const emit = defineEmits(['handleDeleteClick', 'onFavoriteClick'])
const props = defineProps({
  product: {
    type: Object,
    required: false,
    default: () => {},
  },
})
const favoriteStore = useFavoriteStore()
const handleAddToFavorite = () => emit('onFavoriteClick', props.product.id)

const isFavorite = computed(() =>
  favoriteStore.products.some(product => product.id == props.product.id)
)
</script>

<template>
  <div class="flex items-center mt-2 space-x-2">
    <button @click="handleAddToFavorite">
      <icons-v-like
        class="hover:fill-gray-700 transition duration-300"
        :class="{ 'fill-red-700': isFavorite }"
      />
    </button>
    <button @click="emit('handleDeleteClick')">
      <icons-v-delete class="hover:fill-gray-700 transition duration-300" />
    </button>
  </div>
</template>
