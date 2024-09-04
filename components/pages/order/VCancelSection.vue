<script setup lang="ts">
defineProps({
  status: {
    type: String,
    default: 'unknown',
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['handleCancelOrder', 'handleYes', 'handleNo'])
</script>

<template>
  <div v-auto-animate>
    <div
      v-if="status !== 'canceled' && status !== 'done' && !confirm"
      class="min-h-[8rem]"
    >
      <button
        class="w-full mt-4 border border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 py-2 px-4 rounded-lg active:bg-red-900 active:text-white"
        :disabled="loading"
        @click="emits('handleCancelOrder')"
      >
        Отменить заказ
      </button>
    </div>
    <div v-if="confirm" class="min-h-[8rem]">
      <button
        class="w-full mt-4 border border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600 py-2 px-4 rounded-lg active:bg-green-900 active:text-white"
        :disabled="loading"
        @click="emits('handleNo')"
      >
        Нет
      </button>
      <button
        v-if="!loading"
        class="w-full mt-4 border border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 py-2 px-4 rounded-lg active:bg-red-900 active:text-white"
        :disabled="loading"
        @click="emits('handleYes')"
      >
        Да
      </button>
      <div
        v-else
        class="items-center justify-center w-full mt-4 border border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 py-2 px-4 rounded-lg active:bg-red-900 active:text-white"
      >
        <v-preloader class="w-6 h-6" />
      </div>
    </div>
  </div>
</template>
