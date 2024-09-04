<template>
  <div v-auto-animate>
    <pages-v-page-header title="Домашняя страница" />
    <lazy-pages-home-v-toolbar />
    <common-v-preloader v-if="status === 'pending'" />
    <lazy-pages-home-v-products-section
      v-if="status === 'success'"
      :products="products"
    />
    <lazy-pages-error-v-error
      v-if="error || status === 'error'"
      :error="error"
      @on-refresh="refresh"
    >
      <template #button>
        <button
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
          @click="refresh"
        >
          Обновить
        </button>
      </template>
    </lazy-pages-error-v-error>
  </div>
</template>

<script setup lang="ts">
const productsStore = useProductsStore()
const products = computed(() => productsStore.getProducts)
const searchQuery = computed(() => productsStore.getSearchQuery)
const sortBy = computed(() => productsStore.getSortBy)

const { status, refresh, error } = useAsyncData(() =>
  productsStore.loadProducts()
)
watch([searchQuery, sortBy], () => {
  refresh()
})
</script>
