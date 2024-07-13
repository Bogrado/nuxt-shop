<template>
  <div
    v-if="isMenuOpen"
    class="fixed top-0 right-0 w-1/2 h-full bg-gray-800 bg-opacity-95 flex flex-col items-center pt-20 z-30 md:hidden"
  >
    <button class="text-white mb-4" @click="$emit('toggle-menu')">
      Закрыть
    </button>
    <ul class="flex flex-col items-center gap-4">
      <li
        class="relative flex flex-col items-center text-white cursor-pointer hover:text-gray-300"
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
        class="relative flex flex-col items-center text-white cursor-pointer hover:text-gray-300"
      >
        <div class="w-8 h-8 bg-gray-600" />
        <span class="text-sm">Войти</span>
        <div class="text-sm flex flex-col items-center">
          <span class="text-sm">заглушка</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  isMenuOpen: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['toggle-menu'])
</script>
