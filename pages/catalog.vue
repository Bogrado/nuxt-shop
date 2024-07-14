<template>
  <div>
    <pages-v-page-header title="Каталог" />
    <!-- Нижний блок с сеткой товаров -->
    <lazy-pages-home-v-products-section>
      <template #default>
        <pages-catalog-v-toolbar />
      </template>
    </lazy-pages-home-v-products-section>
  </div>
</template>

<script setup>
// В данном случае логика не требуется
</script>

<style scoped>
/* Добавьте любые дополнительные стили здесь */
</style>
