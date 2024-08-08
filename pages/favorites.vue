<script setup lang="ts">
const favoriteStore = useFavoriteStore()
const products = computed(() => favoriteStore.products)
</script>

<template>
  <div>
    <!-- Заголовок страницы -->
    <pages-v-page-header title="Избранное" />
    <button
      class="border border-red-500 text-red-500 p-2 rounded hover:bg-red-500 hover:text-white"
      @click="favoriteStore.loadUserFavorites()"
    >
      click
    </button>
    <button
      class="border border-red-500 text-red-500 p-2 rounded hover:bg-red-500 hover:text-white"
      @click="favoriteStore.loadFavoritesProducts()"
    >
      loadFavoritesProducts
    </button>
    <div v-auto-animate>
      <!-- Нижний блок с сеткой товаров -->
      <lazy-pages-home-v-products-section
        v-if="products"
        :products="products"
      />
    </div>
  </div>
</template>
