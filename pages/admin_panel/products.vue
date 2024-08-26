<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})
const loadingStore = useLoadingStore()
const modalStore = useModalStore()
const itemsManagerStore = useItemsManagerStore()

const getItems = computed(() => itemsManagerStore.getItems)
const loading = computed(() => loadingStore.loading)

const editItem = id => {
  console.log(id)
  itemsManagerStore.setItemId(id)
  modalStore.openModal('editItem', id)
}

const createItem = () => {
  itemsManagerStore.setItemId(null)
  modalStore.openModal('createItem')
}

const deleteItem = id => {
  itemsManagerStore.setItemId(id)
  modalStore.openModal('deleteItem', id)
}

onMounted(() => {
  itemsManagerStore.loadProducts()
})
</script>

<template>
  <client-only>
    <div v-auto-animate>
      <pages-v-page-header :title="'Менеджер товаров'" />
      <common-v-preloader v-if="loading" />
      <div v-else class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Товары</h3>
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              @click="createItem"
            >
              Добавить товар
            </button>
          </div>
          <pages-admin-table-t-product
            :items="getItems"
            @handle-edit-click="editItem"
            @handle-delete-click="deleteItem"
          />
        </div>
      </div>
    </div>
  </client-only>
</template>
