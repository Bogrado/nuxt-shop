<script setup>
import { useCancelForm } from '~/composables/forms/useCancelForm.ts'

const props = defineProps({
  itemId: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits(['closeModal'])
const { confirmCancel, error } = useCancelForm(emits)

const handleConfirm = () => {
  confirmCancel?.(props.itemId)
}

const handleCancel = () => {
  emits('closeModal')
}
</script>

<template>
  <div
    class="bg-gray-800 flex flex-col items-center p-4 rounded-lg text-center shadow"
  >
    <p class="text-white mb-4">Вы действительно хотите отменить заказ?</p>
    <div class="flex justify-end space-x-4">
      <button
        class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
        @click="handleCancel"
      >
        Нет
      </button>
      <button
        class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        @click="handleConfirm"
      >
        Да
      </button>
    </div>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template>
