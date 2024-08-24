<template>
  <div
    class="lg:w-1/3 lg:sticky lg:top-4 bg-gray-100 p-4 rounded-lg shadow-md h-max mt-8 lg:mt-0"
  >
    <slot name="header">Header</slot>
    <slot name="body">Body</slot>
    <slot name="footer">footer</slot>
  </div>
</template>
