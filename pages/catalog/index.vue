<template>
  <div v-auto-animate>
    <pages-v-page-header title="Домашняя страница" />
    <!-- Нижний блок с сеткой товаров -->
    <pages-home-v-toolbar />
    <lazy-pages-home-v-products-section
      v-if="status === 'success'"
      :products="products"
    />
    <common-v-preloader v-if="status === 'pending'" />
  </div>
</template>

<script setup lang="ts">
const productsStore = useProductsStore()
const products = computed(() => productsStore.getProducts)
const searchQuery = computed(() => productsStore.getSearchQuery)
const sortBy = computed(() => productsStore.getSortBy)

const { status, refresh } = useAsyncData(() => productsStore.loadProducts())

watch([searchQuery, sortBy], () => {
  refresh()
})
</script>
