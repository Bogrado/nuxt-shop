<script setup lang="ts">
defineProps({
  rate: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="w-full lg:w-2/5 bg-white p-4 rounded-lg shadow-md">
    <div class="text-gray-500 mb-4 flex items-center gap-1">
      {{ rate }}
      <icons-v-star class="w-4" />
      {{ count }} оценок
    </div>
    <div class="mb-4">
      <div class="flex justify-between">
        <span class="text-gray-500">Категория</span>
        <span>{{ category }}</span>
      </div>
    </div>
    <div>
      <h1 class="text-lg font-bold mb-4 text-gray-500">Description</h1>
      <p>{{ description }}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
        aspernatur autem iure placeat rem? Alias aspernatur atque blanditiis
        doloremque dolorum eaque provident reiciendis sint, ut velit! Aliquam,
        culpa dolorum est, hic ipsa iste nam necessitatibus odit optio
        recusandae sint unde. Animi aut cumque esse ex id illum impedit natus
        odio totam ut? Doloribus eum excepturi, magni nesciunt nisi unde ut vel
        velit voluptatibus. Accusantium adipisci architecto assumenda at aut,
        commodi consequatur, dicta distinctio dolor dolore eius eveniet expedita
        facere facilis harum laborum minima minus modi molestiae nam non porro
        praesentium quasi, quibusdam quisquam quod quos reiciendis sint vero
        voluptas. Blanditiis?
      </p>
    </div>
  </div>
</template>
