<script setup lang="ts">
import type { User } from '~/types'

const { user, patchUser } = useAuthStore()

defineEmits(['handleLogout'])

const firstName = ref('')
const lastName = ref('')
const handleSave = () => {
  if (firstName.value && lastName.value) {
    user.value = {
      ...user.value,
      firstName: firstName.value,
      lastName: lastName.value,
    }
    console.log(user.value)
  }
  patchUser()
  isEditing.value = false
}

// Режим редактирования
const isEditing = ref(false)
</script>

<template>
  <div>
    <!-- Верхний блок с заголовком и кнопкой выхода -->
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

    <!-- Основной контент -->
    <div
      class="pl-4 py-4 flex flex-col sm:flex-row justify-between items-start"
    >
      <div>
        <!-- Логин -->
        <div class="mb-2">
          <label class="block text-sm font-medium text-gray-700">Логин</label>
          <p class="text-base sm:text-lg break-words">{{ user.nickName }}</p>
        </div>

        <!-- Имя пользователя -->
        <div class="mb-2">
          <label class="block text-sm font-medium text-gray-700"
            >Имя пользователя</label
          >
          <template v-if="isEditing">
            <input
              v-model="firstName"
              type="text"
              class="text-base sm:text-lg break-words w-full mt-1 p-2 border border-gray-600 rounded"
            />
          </template>
          <p v-else class="text-base sm:text-lg break-words">
            {{ user.firstName ? user.firstName : 'Не указано' }}
          </p>
        </div>

        <!-- Фамилия пользователя -->
        <div class="mb-2">
          <label class="block text-sm font-medium text-gray-700"
            >Фамилия пользователя</label
          >
          <template v-if="isEditing">
            <input
              v-model="lastName"
              type="text"
              class="text-base sm:text-lg break-words w-full mt-1 p-2 border border-gray-600 rounded"
            />
          </template>
          <p v-else class="text-base sm:text-lg break-words">
            {{ user.lastName ? user.lastName : 'Не указано' }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="text-base sm:text-lg break-words">{{ user.email }}</p>
        </div>
      </div>

      <!-- Кнопки -->
      <div class="mt-4 sm:mt-0 sm:ml-4">
        <button
          v-if="!isEditing"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          @click="isEditing = true"
        >
          Изменить
        </button>
        <div v-else>
          <button
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
            @click="handleSave"
          >
            Сохранить
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            @click="isEditing = false"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
