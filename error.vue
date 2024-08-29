<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object as () => NuxtError,
})
</script>
<template>
  <nuxt-layout name="default">
    <pages-error-v-error :error="props.error" />
  </nuxt-layout>
</template>
