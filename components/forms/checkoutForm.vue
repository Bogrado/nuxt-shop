<template>
  <div class="w-full lg:w-2/3 bg-white p-4 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">Информация о доставке</h2>
    <form class="space-y-4" @submit.prevent="submitForm">
      <div>
        <label for="firstName" class="block text-sm font-medium text-gray-700"
          >Имя</label
        >
        <input
          id="firstName"
          v-model="state.firstName"
          type="text"
          :class="{ 'border-red-500': v$.firstName.$error }"
          class="mt-1 block w-full p-2 border rounded bg-gray-100"
          @blur="v$.firstName.$touch"
        />
        <span v-if="v$.firstName.$error" class="text-red-500 text-sm"
          >Некорректное имя</span
        >
      </div>
      <div>
        <label for="lastName" class="block text-sm font-medium text-gray-700"
          >Фамилия</label
        >
        <input
          id="lastName"
          v-model="state.lastName"
          type="text"
          :class="{ 'border-red-500': v$.lastName.$error }"
          class="mt-1 block w-full p-2 border rounded bg-gray-100"
          @blur="v$.lastName.$touch"
        />
        <span v-if="v$.lastName.$error" class="text-red-500 text-sm"
          >Некорректная фамилия</span
        >
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Электронная почта</label
        >
        <input
          id="email"
          v-model="state.email"
          type="email"
          class="mt-1 block w-full p-2 border rounded bg-gray-100"
          :class="{ 'border-red-500': v$.email.$error }"
          @blur="v$.email.$touch"
        />
        <span v-if="v$.email.$error" class="text-red-500 text-sm"
          >Некорректный email</span
        >
      </div>
      <div>
        <label for="country" class="block text-sm font-medium text-gray-700"
          >Страна</label
        >
        <input
          id="country"
          v-model="state.country"
          type="text"
          :class="{ 'border-red-500': v$.country.$error }"
          class="mt-1 block w-full p-2 border rounded bg-gray-100"
          @blur="v$.country.$touch"
        />
        <span v-if="v$.country.$error" class="text-red-500 text-sm"
          >Некорректная страна</span
        >
      </div>
      <div>
        <label for="city" class="block text-sm font-medium text-gray-700"
          >Город</label
        >
        <input
          id="city"
          v-model="state.city"
          type="text"
          class="mt-1 block w-full p-2 border rounded bg-gray-100"
          :class="{ 'border-red-500': v$.city.$error }"
          @blur="v$.city.$touch"
        />
        <span v-if="v$.city.$error" class="text-red-500 text-sm"
          >Некорректный город</span
        >
      </div>
      <div>
        <label for="postalCode" class="block text-sm font-medium text-gray-700"
          >Почтовый индекс</label
        >
        <input
          id="postalCode"
          v-model="state.postalCode"
          type="text"
          class="mt-1 block w-full p-2 border rounded bg-gray-100"
          :class="{ 'border-red-500': v$.postalCode.$error }"
          @blur="v$.postalCode.$touch"
        />
        <span v-if="v$.postalCode.$error" class="text-red-500 text-sm"
          >Почтовый индекс обязателен и состоит из 6 цифр</span
        >
      </div>
      <div>
        <label
          for="addressLine1"
          class="block text-sm font-medium text-gray-700"
          >Улица</label
        >
        <input
          id="addressLine1"
          v-model="state.addressLine1"
          type="text"
          class="mt-1 block w-full p-2 border rounded bg-gray-100"
          :class="{ 'border-red-500': v$.addressLine1.$error }"
          @blur="v$.addressLine1.$touch"
        />
        <span v-if="v$.addressLine1.$error" class="text-red-500 text-sm"
          >Некорректная улица</span
        >
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label
            for="houseNumber"
            class="block text-sm font-medium text-gray-700"
            >Номер дома</label
          >
          <input
            id="houseNumber"
            v-model="state.houseNumber"
            type="text"
            class="mt-1 block w-full p-2 border rounded bg-gray-100"
            :class="{ 'border-red-500': v$.houseNumber.$error }"
            @blur="v$.houseNumber.$touch"
          />
          <span v-if="v$.houseNumber.$error" class="text-red-500 text-sm"
            >Некорректный номер дома</span
          >
        </div>
        <div>
          <label
            for="apartmentNumber"
            class="block text-sm font-medium text-gray-700"
            >Квартира</label
          >
          <input
            id="apartmentNumber"
            v-model="state.apartmentNumber"
            type="text"
            class="mt-1 block w-full p-2 border rounded bg-gray-100"
            :class="{ 'border-red-500': v$.apartmentNumber.$error }"
            @blur="v$.apartmentNumber.$touch"
          />
          <span v-if="v$.apartmentNumber.$error" class="text-red-500 text-sm"
            >Некорректный номер квартиры</span
          >
        </div>
      </div>
      <div>
        <label class="inline-flex items-center">
          <input
            v-model="state.saveAddress"
            type="checkbox"
            class="form-checkbox bg-gray-700 text-blue-500 border-gray-600"
          />
          <span class="ml-2 text-gray-700">
            Сохранить адрес для следующей покупки
          </span>
        </label>
      </div>
      <div>
        <label class="inline-flex items-center">
          <input
            v-model="state.agreeToTerms"
            type="checkbox"
            class="form-checkbox bg-gray-700 text-blue-500 border-gray-600"
          />
          <span class="ml-2 text-gray-700"
            >Согласие на обработку персональных данных</span
          >
        </label>
      </div>
      <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useCheckout } from '~/composables/forms/useCheckout'

const { state, error, v$, handleCheckout } = useCheckout()

const submitForm = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) {
    state.error = 'Заполните все обязательные поля.'
    return
  }
  await handleCheckout()
}
</script>

<style scoped></style>
