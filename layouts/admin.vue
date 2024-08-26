<template>
  <div class="min-h-screen flex flex-col bg-gray-100" v-auto-animate>
    <!-- Header -->
    <layout-t-header @toggle-menu="toggleMenu" />
    <div class="flex flex-grow">
      <!-- Sidebar -->
      <layout-admin-t-side-bar />
      <!-- Main Content -->
      <main class="flex-grow p-5">
        <slot />
      </main>
    </div>
    <!-- Footer -->
    <layout-t-footer />
    <common-v-modal />
  </div>
</template>

<script setup>
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
