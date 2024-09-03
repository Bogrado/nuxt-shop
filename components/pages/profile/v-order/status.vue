<script setup lang="ts">
const props = defineProps({
  status: {
    type: String,
    required: false,
    default: 'unknown',
  },
})

const statusConfig: Record<string, { text: string; classes: string }> = {
  created: { text: 'Создан', classes: 'bg-blue-100 text-blue-600' },
  delivery: { text: 'В пути', classes: 'bg-blue-100 text-blue-600' },
  done: { text: 'Завершен', classes: 'bg-green-100 text-green-600' },
  canceled: { text: 'Отменен', classes: 'bg-red-100 text-red-600' },
  unknown: { text: 'Неизвестен', classes: 'bg-yellow-100 text-yellow-600' },
}

const statusText = computed(
  () => statusConfig[props.status]?.text || 'Неизвестен'
)
const statusClasses = computed(
  () => statusConfig[props.status]?.classes || 'bg-yellow-100 text-yellow-700'
)
</script>

<template>
  <div class="mb-4 md:mb-0">
    <p class="font-semibold">
      Статус
      <span
        :class="`text-xs font-light px-2 py-1 rounded items-center text-center ${statusClasses}`"
        >{{ statusText }}</span
      >
    </p>
  </div>
</template>

<style scoped></style>
