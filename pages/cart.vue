<script setup lang="ts">
const cartStore = useCartStore()

const products = computed(() => cartStore.products)
const totalPrice = computed(() => cartStore.totalPrice)
const totalItems = computed(() => cartStore.totalItems)
</script>
<template>
  <client-only>
    <!-- Заголовок страницы -->
    <pages-v-page-header title="Корзина" />
    <pages-cart-v-empty v-if="!products.length" />
    <div v-auto-animate>
      <!--      <v-preloader class="w-32 h-32" v-if="cartStore.cartLoading" />-->
      <div
        class="max-w-screen-2xl mx-auto flex flex-col lg:flex-row lg:space-x-8"
      >
        <!-- Левая колонка - товары в корзине -->
        <pages-cart-v-list :products="products" />
        <!--         Правая колонка - информация о заказе -->
        <common-v-summary>
          class="max-w-80" :total-price="totalPrice">
          <template #header>
            <div class="text-lg font-bold mb-4">Ваша корзина</div>
          </template>
          <template #body>
            <div class="text-gray-700 mb-2">Товаров: {{ totalItems }}</div>
            <div class="flex justify-between items-center mb-2">
              <span>Товары:</span>
              <span class="font-bold">{{ totalPrice }} ₽</span>
            </div>
          </template>
          <template #footer>
            <button
              class="bg-gray-700 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-300 active:bg-green-700 focus:outline-none w-full"
              @click="handleAccountCheck"
            >
              Перейти к оформлению
            </button>
          </template>
        </common-v-summary>
      </div>
    </div>
  </client-only>
</template>
