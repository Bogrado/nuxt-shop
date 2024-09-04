<script setup lang="ts">
const favoriteStore = useFavoriteStore()
const products = computed(() => favoriteStore.products)
</script>

<template>
  <client-only>
    <div>
      <!-- Заголовок страницы -->
      <pages-v-page-header title="Избранное" />
      <lazy-common-v-empty
        v-if="!products.length"
        title="Ваш список избранных товаров пуст"
        description="Добавьте товары в избранные, чтобы не потерять"
        image="/_nuxt/assets/static/package_h.png"
        action="Перейти в каталог"
      />
      <div v-auto-animate v-else>
        <!-- Нижний блок с сеткой товаров -->
        <lazy-pages-home-v-products-section
          v-if="products"
          :products="products"
        />
      </div>
    </div>
  </client-only>
</template>
