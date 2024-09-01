<script setup lang="ts">
const { logout, user } = useAuth()
const loadingStore = useLoadingStore()
const modalStore = useModalStore()
const loading = computed(() => loadingStore.loading)

const handleLogout = async () => {
  await logout()
  navigateTo('/catalog')
}
</script>

<template>
  <div v-if="user">
    <pages-v-page-header :title="`Профиль пользователя ${user.nickName}`" />

    <div class="container mx-auto p-4 bg-gray-200 rounded-lg min-h-screen">
      <!-- Profile Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- User Image -->
        <div class="flex justify-center items-center p-4">
          <img
            src="~/assets/static/user.png"
            alt="User Placeholder"
            class="w-48 h-48 object-cover rounded-full border-4 border-gray-800"
          />
        </div>

        <!-- User Info -->
        <div>
          <div class="p-4 bg-gray-800 rounded-lg">
            <h2 class="text-2xl font-semibold text-white">
              Информация о пользователе
            </h2>
          </div>
          <div class="p-4">
            <div class="mb-2">
              <label class="block text-sm font-medium text-gray-700"
                >Имя пользователя</label
              >
              <p class="text-lg">Иван Иванов</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <p class="text-lg">ivan@example.com</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Section -->
      <div class="mx-auto">
        <!-- Orders Section -->
        <div class="mt-8">
          <h2
            class="text-2xl text-white font-semibold mb-4 p-4 bg-slate-800 rounded-lg"
          >
            Заказы
          </h2>

          <!-- Order 1 -->
          <div class="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-medium">Заказ от 28 августа</h3>
                <a href="#" class="text-blue-500 text-sm">44558806-0129</a>
              </div>
              <div class="text-lg font-semibold text-right">
                оплачено <span class="text-green-500">576 ₽</span>
              </div>
            </div>
            <div class="mt-2 flex justify-between items-center">
              <div>
                <p class="text-sm">
                  Доставка в пункт выдачи
                  <span
                    class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                    >В пути</span
                  >
                </p>
                <p class="text-sm text-gray-500">Ожидаемая дата: 6 сентября</p>
              </div>
              <img
                src="https://via.placeholder.com/80"
                alt="Product Image"
                class="w-20 h-20 object-cover rounded"
              />
            </div>
          </div>

          <!-- Order 2 -->
          <div class="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-medium">Заказ от 31 августа</h3>
                <a href="#" class="text-blue-500 text-sm">44558806-0130</a>
              </div>
              <div class="text-lg font-semibold text-right">
                <span>2 008 ₽</span>
              </div>
            </div>
            <div class="mt-2 flex justify-between items-center">
              <div>
                <p class="text-sm">
                  Доставка в пункт выдачи
                  <span
                    class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >Отменён</span
                  >
                </p>
                <p class="text-sm text-gray-500">
                  Дата отмены: 31 августа в 21:11
                </p>
                <p class="text-sm text-gray-500">
                  Причина отмены: Вы решили оформить новый заказ
                </p>
              </div>
              <img
                src="https://via.placeholder.com/80"
                alt="Product Image"
                class="w-20 h-20 object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
