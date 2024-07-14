<template>
  <div
    class="w-full flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-gray-200"
  >
    <div
      class="flex items-center border border-gray-300 rounded-lg bg-white px-2 py-1 w-full sm:w-1/2 lg:w-1/3"
    >
      <input
        type="text"
        placeholder="Поиск..."
        class="focus:outline-none flex-grow"
      />
      <button class="ml-2 text-gray-500 focus:outline-none">✕</button>
    </div>
    <div
      class="flex items-center border border-gray-300 rounded-lg bg-white px-2 py-1 w-full sm:w-1/2 lg:w-1/4"
    >
      <label for="sort" class="mr-2">Сорт</label>
      <select id="sort" class="focus:outline-none flex-grow w-full block">
        <option value="default">По умолчанию</option>
        <option value="price-asc">Цена: по возрастанию</option>
        <option value="price-desc">Цена: по убыванию</option>
      </select>
    </div>
  </div>
</template>
