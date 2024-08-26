<script setup>
import { useDeleteForm } from '~/composables/forms/useDeleteForm'

const props = defineProps({
  itemId: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(['closeModal', 'itemDeleted'])
const { confirmDelete, error } = useDeleteForm(emits)

const handleDelete = () => {
  confirmDelete?.(props.itemId)
}

const handleCancel = () => {
  emits('closeModal')
}
</script>

<template>
  <div class="bg-gray-800 flex flex-col items-center p-4 rounded-lg text-center shadow">
    <p class="text-white mb-4">Подтвердить?</p>
    <div class="flex justify-end space-x-4">
      <button class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition" @click="handleCancel">
        Отмена
      </button>
      <button class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition" @click="handleDelete">
        Удалить
      </button>
    </div>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template>