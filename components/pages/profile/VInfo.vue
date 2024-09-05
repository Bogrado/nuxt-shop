<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{
  user: User
}>()
defineEmits(['handleLogout'])
const { patchUser } = useAuth()
const firstName = ref('')
const lastName = ref('')
const isEditing = ref(false)

const handleSave = async () => {
  isEditing.value = false
  if (!firstName.value || !lastName.value) return
  await patchUser(props.user.id, {
    firstName: firstName.value,
    lastName: lastName.value,
  })
}
const userFirstName = computed(() =>
  props.user.firstName ? props.user.firstName : 'Не указано'
)
const userLastName = computed(() =>
  props.user.lastName ? props.user.lastName : 'Не указано'
)
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
      <!-- Основной блок -->
      <div
        v-if="!isEditing"
        class="p-4 flex flex-col sm:flex-row justify-between items-start"
      >
        <!-- Информация о пользователе -->
        <div>
          <div class="mb-2">
            <label class="block text-sm font-medium text-gray-700">Логин</label>
            <p class="text-base sm:text-lg break-words">{{ user.nickName }}</p>
          </div>
          <div class="mb-2">
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <p class="text-base sm:text-lg break-words">{{ user.email }}</p>
          </div>
          <div class="mb-2">
            <label class="block text-sm font-medium text-gray-700"
              >Имя пользователя</label
            >
            <p class="text-base sm:text-lg break-words">
              {{ userFirstName }}
            </p>
          </div>
          <div class="mb-2">
            <label class="block text-sm font-medium text-gray-700"
              >Фамилия пользователя</label
            >
            <p class="text-base sm:text-lg break-words">
              {{ userLastName }}
            </p>
          </div>
        </div>

        <!-- Кнопка "Дополнить информацию" -->
        <button
          v-if="userFirstName === 'Не указано' || userLastName === 'Не указано'"
          class="mt-4 sm:mt-0 sm:ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          @click="isEditing = true"
        >
          Дополнить информацию
        </button>
      </div>

      <!-- Блок с инпутами -->
      <div v-if="isEditing" class="p-4">
        <div>
          <!-- Имя пользователя -->
          <div class="mb-2">
            <label class="block text-sm font-medium text-gray-700"
              >Имя пользователя</label
            >
            <input
              v-model="firstName"
              type="text"
              class="text-base sm:text-lg break-words w-full mt-1 p-2 border border-gray-600 rounded"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Фамилия пользователя</label
            >
            <input
              v-model="lastName"
              type="text"
              class="text-base sm:text-lg break-words w-full mt-1 p-2 border border-gray-600 rounded"
            />
          </div>

          <!-- Кнопки "Сохранить" и "Отменить" -->
          <div class="mt-4 flex flex-col gap-4 sm:flex-row">
            <button
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              @click="handleSave"
            >
              Сохранить
            </button>
            <button
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              @click="isEditing = false"
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
