<template>
  <div class="container mx-auto p-4">
    <!-- Заголовок страницы -->
    <pages-v-page-header title="Главная страница" />

    <!-- Специальное предложение -->
    <pages-home-v-products-section
      title="Специальные предложения!"
      :products="specialOffers"
    />

    <!-- Избранное -->
    <pages-home-v-products-section
      title="Избранные товары"
      :products="favorites"
    />
  </div>
</template>

<script setup>
const specialOffers = [
  {
    image: 'https://via.placeholder.com/150',
    title: 'Product Title 1',
    description: 'Product Description',
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Product Title 2',
    description: 'Product Description',
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Product Title 3',
    description: 'Product Description',
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Product Title 4',
    description: 'Product Description',
  },
]

const favorites = [
  {
    image: 'https://via.placeholder.com/150',
    title: 'Product Title 1',
    description: 'Product Description',
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Product Title 2',
    description: 'Product Description',
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Product Title 3',
    description: 'Product Description',
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Product Title 4',
    description: 'Product Description',
  },
]
</script>
