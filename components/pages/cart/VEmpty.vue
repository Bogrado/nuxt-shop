<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <img
      src="@/assets/static/package-icon.png"
      alt="Empty Cart"
      class="mb-4 w-72 h-72 object-cover"
    />
    <h1 class="text-2xl font-semibold mb-2">Ваша корзина пуста</h1>
    <p class="text-gray-600 mb-4">
      Добавьте товары в корзину, чтобы начать покупки
    </p>
    <NuxtLink to="/catalog">
      <button
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
      >
        Перейти в каталог
      </button>
    </NuxtLink>
  </div>
</template>
