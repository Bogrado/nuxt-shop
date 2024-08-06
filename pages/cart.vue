<script setup lang="ts">
import { useCartStore } from '~/stores/cartStore'

const cartStore = useCartStore()
</script>
<template>
  <div>
    <!-- Заголовок страницы -->
    <pages-v-page-header title="Корзина" />
    <button class="border border-red-500" @click="cartStore.loadUserCart()">
      click
    </button>
  </div>
</template>
