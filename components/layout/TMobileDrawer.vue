<template>
  <transition name="fade">
    <div
      v-if="isMenuOpen"
      class="fixed top-0 right-0 w-1/2 h-full bg-gray-800 bg-opacity-95 flex flex-col items-center pt-20 z-30 md:hidden"
    >
      <button class="text-white mb-4" @click="$emit('toggle-menu')">
        Закрыть
      </button>
      <ul class="flex flex-col items-center gap-4">
        <li
          v-for="link in links"
          :key="link.to"
          class="relative flex flex-col items-center text-slate-500 cursor-pointer hover:text-white"
        >
          <nuxt-link
            :to="link.to"
            class="flex flex-col items-center"
            active-class="text-white"
            @click="$emit('toggle-menu')"
          >
            <component :is="link.icon" class="w-8 h-8 fill-current" />
            <span class="text-sm">{{ link.label }}</span>
            <span
              v-if="link.to === '/cart'"
              class="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
            >
              0
            </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isMenuOpen: {
    type: Boolean,
    default: false,
  },
  links: {
    type: Array,
    required: false,
    default: () => [],
  },
})

defineEmits(['toggle-menu'])
</script>
