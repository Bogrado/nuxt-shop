<script setup lang="ts">
const favoriteStore = useFavoriteStore()
const products = computed(() => favoriteStore.products)
</script>

<template>
  <client-only>
    <div>
      <!-- Заголовок страницы -->
      <pages-v-page-header title="Избранное" />
      <div v-auto-animate>
        <!-- Нижний блок с сеткой товаров -->
        <lazy-pages-home-v-products-section
          v-if="products"
          :products="products"
        />
      </div>
    </div>
  </client-only>
</template>
