<template>
  <div v-auto-animate>
    <common-v-preloader v-if="status === 'pending'" />
    <div v-else-if="error">
      <pages-error-v-error :error="error" />
    </div>
    <div v-else>
      <pages-v-page-header :title="data.title" />

      <div class="container mx-auto p-4 bg-gray-200 rounded-lg">
        <div
          class="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0"
        >
          <!-- Левая колонка с изображением продукта -->
          <lazy-pages-product-v-image
            :image="data.image"
            :is-favorite="isFavorite"
            @handle-favorite="favoriteStore.toggleFavorite(data.id)"
          />
          <!-- Центральная колонка с информацией о продукте -->
          <lazy-pages-product-v-body
            :category="data.category"
            :description="data.description"
            :rate="data.rate"
            :count="data.count"
          />
          <!-- Правая колонка с информацией о покупке -->
          <lazy-common-v-summary
            class="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow-md"
          >
            <template #header>
              <div
                class="text-lg font-bold mb-4 line-clamp-1 text-ellipsis overflow-hidden"
              >
                {{ data.title }}
              </div>
            </template>
            <template #body>
              <div class="flex justify-between">
                <div class="text-lg font-bold mb-4">Цена:</div>
                <div class="text-lg font-bold mb-4">
                  {{ quantity ? data.price * quantity : data.price }} ₽
                </div>
              </div>
            </template>
            <template #footer>
              <common-v-cart-manager
                :is-in-cart="isInCart"
                :loading="loading"
                :quantity="quantity"
                @on-add-to-cart="cartStore.addItem(data.id)"
                @on-remove-from-cart="cartStore.removeItem(data.id)"
              />
            </template>
          </lazy-common-v-summary>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const id = parseInt(route.params.slug.split('-').pop())
const { data, status, error } = await useFetch('/api/data/item', {
  params: { id },
})

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const isFavorite = computed(() =>
  favoriteStore.products.some(product => product.id === data.value.id)
)
const isInCart = computed(() => cartStore.itemIds.includes(data.value.id))
const quantity = computed(() => cartStore.itemQuantity(data.value.id))
const loading = computed(() => cartStore.itemLoading(data.value.id))
</script>
