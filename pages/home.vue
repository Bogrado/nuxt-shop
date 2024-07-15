<template>
  <div v-auto-animate>
    <pages-v-page-header title="Домашняя страница" />
    <!-- Нижний блок с сеткой товаров -->
    <button
      class="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      @click="refresh"
    >
      обновить
    </button>
    <pages-home-v-toolbar />
    <lazy-pages-home-v-products-section
      v-if="status === 'success'"
      :products="products"
    />
    <common-v-preloader v-if="status === 'pending'" />
  </div>
</template>

<script setup>
const productsStore = useProductsStore()
const products = computed(() => productsStore.getProducts)
const searchQuery = computed(() => productsStore.getSearchQuery)
const sortBy = computed(() => productsStore.getSortBy)

const { status, refresh } = useAsyncData(() => productsStore.loadProducts())

watch([searchQuery, sortBy], () => {
  refresh()
})
</script>
