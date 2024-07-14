<template>
  <div>
    <pages-v-page-header title="Домашняя страница" />
    <!-- Нижний блок с сеткой товаров -->
    <lazy-pages-home-v-products-section
      v-if="status === 'success'"
      :products="products"
    >
      <template #default>
        <pages-home-v-toolbar />
      </template>
    </lazy-pages-home-v-products-section>
  </div>
</template>

<script setup>
const productsStore = useProductsStore()
const products = computed(() => productsStore.getProducts)

const { status, refresh } = useAsyncData(() => productsStore.loadProducts())
</script>
