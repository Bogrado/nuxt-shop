<script setup lang="ts">
import type { User } from '~/types'

defineProps<{
  user: User
}>()
defineEmits(['handleLogout'])
</script>
<template>
  <div>
    <div
      class="p-4 bg-gray-800 rounded-lg flex items-center justify-between text-white"
    >
      <h2 class="text-2xl font-semibold text-white">
        Информация о пользователе
      </h2>
      <button
        class="relative flex flex-col items-center group"
        @click="$emit('handleLogout')"
      >
        <icons-v-logout class="w-8 h-8 fill-current" />
        <span
          class="absolute top-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs bg-gray-200 text-gray-800 py-1 px-2 rounded-lg shadow-lg border border-gray-800"
        >
          Выйти
        </span>
      </button>
    </div>
    <div class="p-4">
      <div>
        <div class="mb-2">
          <label class="block text-sm font-medium text-gray-700"
            >Имя пользователя</label
          >
          <p class="text-base sm:text-lg break-words">{{ user.nickName }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="text-base sm:text-lg break-words">{{ user.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
