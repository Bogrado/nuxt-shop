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
    <lazy-pages-home-v-products-section
      v-if="status === 'success'"
      :products="products"
    >
      <template #default>
        <pages-home-v-toolbar />
      </template>
    </lazy-pages-home-v-products-section>
    <common-v-preloader v-if="status === 'pending'" />
  </div>
</template>

<script setup>
const productsStore = useProductsStore()
const products = computed(() => productsStore.getProducts)

const { status, refresh } = useAsyncData(() => productsStore.loadProducts())
</script>
