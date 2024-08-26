<script setup lang="ts"></script>

<template>
  <aside class="w-64 bg-gray-800 shadow-lg flex flex-col p-5">
    <nav class="space-y-2">
      <h2 class="text-xl text-slate-50 font-semibold mb-5">Admin Panel</h2>
      <NuxtLink
        to="/admin_panel/dashboard"
        class="block py-2 px-4 rounded-lg hover:bg-gray-200 hover:text-slate-800 transition-colors duration-300 text-slate-50"
        active-class="text-slate-800 bg-gray-200"
      >
        Dashboard
      </NuxtLink>
      <NuxtLink
        to="/admin_panel/products"
        class="block py-2 px-4 rounded-lg hover:bg-gray-200 hover:text-slate-800 transition-colors duration-300 text-slate-50"
        active-class="text-slate-800 bg-gray-200"
      >
        Products
      </NuxtLink>
      <NuxtLink
        to="/admin_panel/orders"
        class="block py-2 px-4 rounded-lg hover:bg-gray-200 hover:text-slate-800 transition-colors duration-300 text-slate-50"
        active-class="text-slate-800 bg-gray-200"
      >
        Orders
      </NuxtLink>
    </nav>
  </aside>
</template>

<style scoped></style>
