<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header
      class="px-4 py-4 sm:px-10 sm:py-8 top-0 z-20 flex items-center justify-between p-3 border-b bg-gray-800 border-gray-200"
    >
      <div>
        <img src="/path/to/logo.png" alt="Logo" class="w-8 h-8" />
      </div>
      <ul class="flex items-center gap-4 sm:gap-10">
        <li
          class="relative flex flex-col items-center text-slate-500 cursor-pointer hover:text-white"
        >
          <div class="w-8 h-8 bg-gray-600" />
          <span class="text-sm">Корзина</span>
          <span
            class="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
          >
            0
          </span>
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

    <!-- Main Content -->
    <main class="flex-1 container mx-auto p-4">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white p-4">
      <div class="container mx-auto text-center">
        © 2024 MyCompany. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Здесь можно добавить свои стили, если потребуется */
</style>
