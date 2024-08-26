<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})
const loadingStore = useLoadingStore()
const totalProducts = ref(0)
const totalUsers = ref(0)
const orders = ref([])

const loading = computed(() => loadingStore.loading)

const fetchDashboardData = async () => {
  loadingStore.setLoading(true)
  try {
    const productsData = await $fetch('/api/data/items', {
      method: 'GET',
    })
    const usersData = await $fetch('/api/auth/users', {
      method: 'GET',
    })
    const ordersData = await $fetch('/api/orders/orders', {
      method: 'GET',
    })
    totalProducts.value = productsData.length
    totalUsers.value = usersData.length
    orders.value = ordersData
  } catch (e) {
    handleFetchError(e)
  } finally {
    loadingStore.setLoading(false)
  }
}

onMounted(fetchDashboardData)
</script>

<template>
  <client-only>
    <div v-auto-animate>
      <pages-v-page-header :title="'Суммарная информация'" />
      <common-v-preloader v-if="loading" />
      <div v-else class="space-y-8">
        <div class="flex space-x-4">
          <div class="p-4 bg-white shadow rounded flex-1 text-center">
            <h2 class="text-2xl font-bold">Total Products</h2>
            <p class="text-xl">{{ totalProducts }}</p>
          </div>
          <div class="p-4 bg-white shadow rounded flex-1 text-center">
            <h2 class="text-2xl font-bold">Total Users</h2>
            <p class="text-xl">{{ totalUsers }}</p>
          </div>
        </div>
        <div class="p-4 bg-white shadow rounded text-center">
          <h2 class="text-2xl font-bold mb-4">Orders</h2>
          <p class="text-xl">{{ orders.length }}</p>
        </div>
      </div>
    </div>
  </client-only>
</template>
