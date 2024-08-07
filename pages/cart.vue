<script setup lang="ts">
const cartStore = useCartStore()

const products = computed(() => cartStore.products)
</script>
<template>
  <div>
    <!-- Заголовок страницы -->
    <pages-v-page-header title="Корзина" />
    <div v-if="!cartStore.products.length" class="text-center text-gray-700">
      Ваша корзина пуста.
    </div>
    <div v-auto-animate>
      <!--      <v-preloader class="w-32 h-32" v-if="cartStore.cartLoading" />-->
      <div
        class="max-w-screen-2xl mx-auto flex flex-col lg:flex-row lg:space-x-8"
      >
        <!-- Левая колонка - товары в корзине -->
        <pages-cart-v-list :products="products" />
        <!-- Правая колонка - информация о заказе -->
        <!--      <OrderSummary class="max-w-80" :total-price="totalPrice">-->
        <!--        <template #header>-->
        <!--          <div class="text-lg font-bold mb-4">Ваша корзина</div>-->
        <!--        </template>-->
        <!--        <template #body>-->
        <!--          <div class="text-gray-700 mb-2">Товаров: {{ totalItems }}</div>-->
        <!--          <div class="flex justify-between items-center mb-2">-->
        <!--            <span>Товары:</span>-->
        <!--            <span class="font-bold">{{ totalPrice }} ₽</span>-->
        <!--          </div>-->
        <!--        </template>-->
        <!--        <template #footer>-->
        <!--          <button-->
        <!--            @click="handleAccountCheck"-->
        <!--            class="bg-gray-700 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-300 active:bg-green-700 focus:outline-none w-full"-->
        <!--          >-->
        <!--            Перейти к оформлению-->
        <!--          </button>-->
        <!--        </template>-->
        <!--      </OrderSummary>-->
      </div>
    </div>
  </div>
</template>
