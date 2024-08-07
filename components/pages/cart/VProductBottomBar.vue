<script setup>
defineEmits(['handleDeleteClick'])
</script>

<template>
  <div class="flex items-center mt-2 space-x-2">
    <button>
      <icons-v-like class="hover:fill-gray-700 transition duration-300" />
    </button>
    <button @click="$emit('handleDeleteClick')">
      <icons-v-delete class="hover:fill-gray-700 transition duration-300" />
    </button>
  </div>
</template>
