<script setup>
defineProps({
  keys: {
    type: Array,
    required: true,
  },
})
</script>
<template>
  <thead class="bg-gray-50">
    <tr>
      <th
        v-for="key in keys"
        :key="key"
        scope="col"
        class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        {{ key }}
      </th>
      <th
        scope="col"
        class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        actions
      </th>
    </tr>
  </thead>
</template>
