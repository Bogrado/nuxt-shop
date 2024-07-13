<template>
  <div class="container mx-auto p-4">
    <!-- Заголовок страницы -->
    <h1 class="text-4xl font-bold mb-8">Главная страница</h1>

    <!-- Специальное предложение -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold underline mb-4">
        Специальные предложения!
      </h2>
      <div class="flex flex-wrap justify-center gap-4">
        <div
          v-for="n in 4"
          :key="'offer' + n"
          class="bg-white p-4 rounded shadow-md max-w-xs w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <div class="w-full h-40 mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Product Image"
              class="w-full h-full object-cover rounded"
            />
          </div>
          <h3 class="text-xl font-bold mb-2">Product Title {{ n }}</h3>
          <p class="text-gray-700">Product Description</p>
        </div>
      </div>
    </section>

    <!-- Избранное -->
    <section>
      <h2 class="text-3xl font-bold underline mb-4">Избранное</h2>
      <div class="flex flex-wrap justify-center gap-4">
        <div
          v-for="n in 4"
          :key="'favorite' + n"
          class="bg-white p-4 rounded shadow-md max-w-xs w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <div class="w-full h-40 mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Product Image"
              class="w-full h-full object-cover rounded"
            />
          </div>
          <h3 class="text-xl font-bold mb-2">Product Title {{ n }}</h3>
          <p class="text-gray-700">Product Description</p>
        </div>
      </div>
    </section>
  </div>
</template>
