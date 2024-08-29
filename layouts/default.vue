<template>
  <div v-auto-animate class="min-h-screen flex flex-col bg-gray-100">
    <!-- Header -->
    <layout-t-header @toggle-menu="toggleMenu" />

    <!-- Dropdown Menu -->
    <layout-t-mobile-drawer
      :is-menu-open="isMenuOpen"
      @toggle-menu="toggleMenu"
    />

    <!-- Main Content -->
    <main v-auto-animate class="flex-1 container mx-auto p-4">
      <slot />
    </main>

    <!-- Footer -->
    <layout-t-footer />
    <lazy-common-v-modal />
  </div>
</template>

<script setup>
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
