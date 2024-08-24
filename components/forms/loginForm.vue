<script setup lang="ts">
import { useLoginForm } from '~/composables/forms/useLoginForm'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['switchTo', 'closeModal'])

const { state, error, v$, handleLogin } = useLoginForm()

const handleSubmit = async () => {
  if (await v$.value.$validate()) {
    await handleLogin(state)
    if (!error.value) emit('closeModal')
  }
}
</script>

<template>
  <div>
    <form
      class="space-y-4 bg-gray-800 p-6 rounded shadow-lg"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-white text-lg font-bold mb-4">Войти с учетной записью</h2>
      <div class="min-h-[6rem]">
        <label for="login-email" class="block text-sm font-medium text-gray-300"
          >Электронная почта</label
        >
        <input
          id="login-email"
          v-model="state.email"
          type="email"
          :class="{ 'border-red-500': v$.email.$error }"
          class="mt-1 block w-full p-2 border rounded bg-gray-700 text-white border-gray-600"
          :disabled="loading"
          :readonly="loading"
          :tabindex="loading ? -1 : 0"
          @blur="v$.email.$touch"
        />
        <span v-if="v$.email.$error" class="text-red-500 text-sm"
          >Некорректный email</span
        >
      </div>
      <div class="min-h-[6rem]">
        <label
          for="login-password"
          class="block text-sm font-medium text-gray-300"
          >Пароль</label
        >
        <input
          id="login-password"
          v-model="state.password"
          type="password"
          :class="{ 'border-red-500': v$.password.$error }"
          class="mt-1 block w-full p-2 border rounded bg-gray-700 text-white border-gray-600"
          :readonly="loading"
          :disabled="loading"
          :tabindex="loading ? -1 : 0"
          @blur="v$.password.$touch"
        />
        <span v-if="v$.password.$error" class="text-red-500 text-sm"
          >Некорректный пароль</span
        >
      </div>
      <div class="flex items-center justify-between text-gray-400">
        <label class="inline-flex items-center">
          <input
            v-model="state.rememberMe"
            type="checkbox"
            class="form-checkbox bg-gray-700 text-blue-500 border-gray-600"
          />
          <span class="ml-2">Запомнить меня</span>
        </label>
        <a href="#" class="hover:text-white">Забыли пароль?</a>
      </div>
      <div v-auto-animate>
        <button
          v-if="!loading"
          type="submit"
          class="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600 transition"
        >
          Войти
        </button>
        <div
          v-if="loading"
          class="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600"
        >
          <v-preloader />
        </div>
      </div>
      <div class="text-center text-gray-400 mt-4">
        <span>Нет учетной записи?</span>
        <button
          type="button"
          class="w-full mt-2 py-2 border border-gray-600 rounded text-gray-300 hover:bg-gray-700 transition"
          :disabled="loading"
          @click="emit('switchTo', 'register')"
        >
          Зарегистрироваться
        </button>
      </div>
      <div class="min-h-[2rem] text-center">
        <p v-if="error" class="text-red-500 mt-4 text-sm">{{ error }}</p>
      </div>
    </form>
  </div>
</template>
