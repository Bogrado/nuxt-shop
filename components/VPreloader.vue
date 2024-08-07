<template>
  <div
    :class="[
      'loader border-t-4 border-gray-900 rounded-full animate-spin m-auto',
      $attrs.class,
      // добавляем дефолтные классы, если не переданы другие классы для ширины и высоты
      !$attrs.class?.includes('w-') ? 'w-6' : '',
      !$attrs.class?.includes('h-') ? 'h-6' : '',
    ]"
  />
</template>
