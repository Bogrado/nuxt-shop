<script setup>
defineEmits(['onEditClick', 'onDeleteClick'])

defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>
<template>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr v-for="item in items" :key="item.id">
      <td class="px-6 py-4 text-center text-sm text-gray-500">{{ item.id }}</td>
      <td class="px-6 py-4 text-center text-sm text-gray-500">
        {{ item.title }}
      </td>
      <td class="px-6 py-4 text-center text-sm text-gray-500">
        {{ item.price }} P
      </td>
      <td class="px-6 py-4 text-center text-sm text-gray-500">
        {{ item.category }}
      </td>
      <td
        class="px-6 py-4 text-center text-sm font-medium flex flex-col justify-center items-center space-y-1"
      >
        <button
          class="text-yellow-600 hover:text-yellow-900 bg-yellow-100 px-2 py-1 rounded-md w-16"
          @click="$emit('onEditClick', item.id)"
        >
          Edit
        </button>
        <button
          class="text-red-600 hover:text-red-900 bg-red-100 px-2 py-1 rounded-md w-16"
          @click="$emit('onDeleteClick', item.id)"
        >
          Delete
        </button>
      </td>
    </tr>
  </tbody>
</template>
