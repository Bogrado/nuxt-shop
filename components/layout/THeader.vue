<template>
  <header
    class="px-4 py-4 sm:px-10 sm:py-8 top-0 z-20 flex items-center justify-between p-3 border-b bg-gray-800 border-gray-200"
  >
    <nuxt-link to="/home" class="flex items-center gap-2 sm:gap-4 text-white">
      <img src="/assets/static/logo.png" alt="Logo" class="w-8 sm:w-10" />
      <div>
        <h2 class="text-lg sm:text-xl font-bold uppercase">Otus Shop</h2>
        <p class="text-slate-400 text-xs sm:text-base">Магазин чего-то</p>
      </div>
    </nuxt-link>
    <ul class="flex items-center gap-4 sm:gap-10">
      <li
        class="relative flex flex-col items-center text-slate-500 cursor-pointer hover:text-white"
      >
        <nuxt-link to="/favorites" class="flex flex-col items-center">
          <div class="w-8 h-8 bg-gray-600" />
          <span class="text-sm">Избранное</span>
        </nuxt-link>
      </li>
      <li
        class="relative flex flex-col items-center text-slate-500 cursor-pointer hover:text-white"
      >
        <nuxt-link to="/cart" class="flex flex-col items-center">
          <div class="w-8 h-8 bg-gray-600" />
          <span class="text-sm">Корзина</span>
          <span
            class="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
          >
            0
          </span>
        </nuxt-link>
      </li>
      <li
        class="relative flex flex-col items-center text-slate-500 cursor-pointer hover:text-white"
      >
        <nuxt-link to="/home" class="flex flex-col items-center">
          <div class="w-8 h-8 bg-gray-600" />
          <span class="text-sm">Товары</span>
        </nuxt-link>
      </li>
      <li
        class="relative flex flex-col items-center text-slate-500 cursor-pointer hover:text-white"
      >
        <div class="w-8 h-8 bg-gray-600" />
        <span class="text-sm">Войти</span>
        <div class="text-sm flex flex-col items-center">
          <span class="text-sm">заглушка</span>
        </div>
      </li>
    </ul>
  </header>
</template>
