<script setup lang="ts"></script>

<template>
  <div
    class="border-b py-4 flex flex-col md:flex-row justify-between items-start md:items-center animate-pulse"
  >
    <div class="flex items-center">
      <!-- Placeholder для изображения товара -->
      <div class="w-32 h-32 bg-gray-300 rounded-md" />

      <div class="ml-4">
        <!-- Placeholder для заголовка и описания товара -->
        <div class="w-36 h-4 bg-gray-300 rounded-md mb-2" />
        <div class="w-36 h-4 bg-gray-300 rounded-md mb-2" />
        <div class="w-24 h-4 bg-gray-300 rounded-md mb-2" />
        <div class="w-24 h-4 bg-gray-300 rounded-md mb-2" />

        <!-- Placeholder для кнопок/ссылок -->
        <div class="mt-4 flex space-x-2">
          <div class="w-6 h-6 bg-gray-300 rounded-md" />
          <div class="w-6 h-6 bg-gray-300 rounded-md" />
        </div>
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row items-start md:items-center mt-4 md:mt-0 md:ml-auto"
    >
      <!-- Placeholder для цены -->
      <div class="text-right md:text-left mb-2 md:mb-0 md:mr-8">
        <div class="w-20 h-6 bg-gray-300 rounded-md" />
      </div>

      <!-- Placeholder для менеджера количества -->
      <div class="flex space-x-1">
        <div class="w-7 h-7 bg-gray-300 rounded-md" />
        <div class="w-7 h-7 bg-gray-300 rounded-md" />
        <div class="w-7 h-7 bg-gray-300 rounded-md" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
