<template>
  <div
    class="w-full flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-gray-200"
  >
    <div
      class="flex items-center border border-gray-300 rounded-lg bg-white px-2 py-1 w-full sm:w-1/2 lg:w-1/3"
    >
      <input
        :value="searchQuery"
        type="text"
        placeholder="Поиск..."
        class="focus:outline-none flex-grow"
        @input="productsStore.setSearchQuery($event.target.value)"
      />
      <button
        class="ml-2 text-gray-500 focus:outline-none"
        @click="clearSearch"
      >
        ✕
      </button>
    </div>
    <div
      class="flex items-center border border-gray-300 rounded-lg bg-white px-2 py-1 w-full sm:w-1/2 lg:w-1/4"
    >
      <label for="sort" class="mr-2">Сортировка</label>
      <select
        id="sort"
        v-model="sort"
        class="focus:outline-none flex-grow w-full block"
      >
        <option
          v-for="filter in filters"
          :key="filter.value"
          :value="filter.value"
        >
          {{ filter.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
const productsStore = useProductsStore()
const searchQuery = computed(() => productsStore.getSearchQuery)
const search = ref('')
const sort = ref('')

const filters = [
  { label: 'По умолчанию', value: '' },
  { label: 'По названию', value: 'title' },
  { label: 'Сначала недорогие', value: 'price' },
  { label: 'Сначала дорогие', value: '-price' },
  { label: 'По категории', value: 'category' },
  { label: 'По рейтингу', value: '-rate' },
  { label: 'По оценкам', value: '-count' },
]

watch(search, newSearch => {
  productsStore.setSearchQuery(newSearch)
})

watch(sort, newSort => {
  productsStore.setSortBy(newSort)
})

const clearSearch = () => {
  productsStore.setSearchQuery('')
}
</script>
