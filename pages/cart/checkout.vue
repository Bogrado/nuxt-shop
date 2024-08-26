<template>
  <div v-auto-animate>
    <h1 class="text-3xl font-bold mb-4 text-center">Оформление заказа</h1>
    <pages-checkout-v-created v-if="createdSuccess" />
    <div
      v-else-if="cartStore.products.length === 0"
      class="text-center text-gray-700"
    >
      Ваша корзина пуста.
    </div>
    <div
      v-else
      class="max-w-screen-lg mx-auto flex flex-col lg:flex-row lg:space-x-8"
    >
      <!-- Левая колонка - информация о доставке -->
      <forms-checkout-form />

      <!-- Правая колонка - информация о заказе -->
      <common-v-summary class="bg-white">
        <template #header>
          <div class="text-lg font-bold mb-4">Ваш заказ</div>
        </template>
        <template #body>
          <div class="space-y-4">
            <div class="flex justify-between">
              <span>Подытог</span>
              <span>{{ totalPrice }} ₽</span>
            </div>
            <div class="flex justify-between">
              <span>Доставка</span>
              <span>БЕСПЛАТНО</span>
            </div>
            <div class="flex justify-between font-bold text-lg">
              <span>Итого</span>
              <span>{{ totalPrice }} ₽</span>
            </div>
          </div>
        </template>
        <template #footer>
          <button
            :disabled="!isFormValid"
            class="w-full bg-gray-700 text-white py-2 rounded hover:bg-green-500 transition duration-300 active:bg-green-700 mt-4 disabled:bg-gray-300 disabled:cursor-not-allowed"
            @click="handleCheckout"
          >
            Разместить заказ
          </button>
        </template>
      </common-v-summary>
    </div>
  </div>
</template>

<script setup>
import { useCheckout } from '~/composables/forms/useCheckout'

const { handleCheckout, isFormValid } = useCheckout()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const createdSuccess = computed(() => orderStore.createdSuccess)
const totalPrice = computed(() => cartStore.totalPrice)

watch(createdSuccess, newVal => {
  if (newVal) {
    setTimeout(() => {
      navigateTo('/')
    }, 3000)
  }
})
</script>
