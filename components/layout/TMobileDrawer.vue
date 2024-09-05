<template>
  <transition name="fade">
    <div
      v-if="isMenuOpen"
      class="w-screen h-full fixed top-0 left-0 z-20 bg-gray-800 bg-opacity-65"
      @click="$emit('toggle-menu')"
    >
      <div
        class="fixed top-0 right-0 w-1/2 h-full bg-gray-800 bg-opacity-95 flex flex-col items-center pt-20 z-30 md:hidden"
        @click.stop
      >
        <button class="text-white mb-4" @click="$emit('toggle-menu')">
          Закрыть
        </button>
        <ul class="flex flex-col items-center gap-4">
          <li
            v-if="!user"
            class="flex flex-col items-center text-slate-500 cursor-pointer hover:text-white"
            @click="$emit('toggle-menu')"
          >
            <nuxt-link
              to="/auth_user/login"
              class="flex flex-col items-center"
              active-class="text-white"
            >
              <v-account class="w-8 h-8 fill-current" />
              <span class="text-sm">Войти</span>
            </nuxt-link>
          </li>
          <li
            v-if="user"
            class="flex flex-col items-center text-slate-500 cursor-pointer hover:text-white"
            @click="$emit('toggle-menu')"
          >
            <nuxt-link
              to="/profile"
              class="flex flex-col items-center"
              active-class="text-white"
            >
              <v-account class="w-8 h-8 fill-current" />
              <span class="text-sm">{{ user.nickName }}</span>
            </nuxt-link>
          </li>
          <li
            v-for="link in links"
            :key="link.to"
            class="relative flex flex-col items-center text-slate-500 cursor-pointer hover:text-white"
          >
            <nuxt-link
              :to="link.to"
              class="flex flex-col items-center"
              active-class="text-white"
              @click="$emit('toggle-menu')"
            >
              <component :is="link.icon" class="w-8 h-8 fill-current" />
              <span class="text-sm">{{ link.label }}</span>
              <span
                v-if="link.to === '/cart'"
                class="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
              >
                {{ totalItems }}
              </span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script setup>
import VAccount from '~/components/icons/VAccount.vue'

const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    default: false,
  },
  links: {
    type: Array,
    required: false,
    default: () => [],
  },
  user: {
    type: Object,
    required: false,
    default: () => {},
  },
  totalItems: {
    type: Number,
    required: false,
    default: 0,
  },
})
defineEmits(['toggle-menu'])

const { $disableScroll, $enableScroll } = useNuxtApp()

watch(
  () => props.isMenuOpen,
  newValue => {
    if (newValue) {
      $disableScroll()
    } else {
      $enableScroll()
    }
  }
)
</script>
