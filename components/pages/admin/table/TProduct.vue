<script setup>
import { computed } from 'vue'

defineEmits(['handleEditClick', 'handleDeleteClick'])

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})
const keys = computed(() =>
  props.items.length ? Object.keys(props.items[0]) : []
)
</script>

<template>
  <div class="border-t border-gray-200">
    <table class="min-w-full divide-y divide-gray-200">
      <pages-admin-table-t-head :keys="keys" />
      <pages-admin-table-t-body
        :items="items"
        @on-edit-click="$emit('handleEditClick', $event)"
        @on-delete-click="$emit('handleDeleteClick', $event)"
      />
    </table>
  </div>
</template>
