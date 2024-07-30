<template>
  <header
    v-auto-animate
    class="sticky top-0 px-4 py-4 sm:px-10 sm:py-8 z-20 flex items-center justify-between p-3 border-b bg-gray-800 border-gray-200"
  >
    <nuxt-link to="/" class="flex items-center gap-2 sm:gap-4 text-white">
      <img src="/assets/static/logo.png" alt="Logo" class="w-8 sm:w-10" />
      <div>
        <h2 class="text-lg sm:text-xl font-bold uppercase">Otus Shop</h2>
        <p class="text-slate-400 text-xs sm:text-base">Магазин чего-то</p>
      </div>
    </nuxt-link>
    <ul class="hidden md:flex items-center gap-4 sm:gap-10">
      <li
        v-for="link in links"
        :key="link.to"
        class="relative flex flex-col items-center text-slate-500 cursor-pointer hover:text-white"
      >
        <nuxt-link
          :to="link.to"
          class="flex flex-col items-center"
          active-class="text-white"
        >
          <component :is="link.icon" class="w-8 h-8 fill-current" />
          <span class="text-sm">{{ link.label }}</span>
          <span
            v-if="link.to === '/cart'"
            class="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
          >
            0
          </span>
        </nuxt-link>
      </li>
      <li
        v-if="!user"
        class="flex flex-col items-center text-slate-500 cursor-pointer hover:text-white"
      >
        <nuxt-link
          to="/login"
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
    </ul>
    <button class="md:hidden text-white text-5xl" @click="toggleMenu">☰</button>
    <layout-t-mobile-drawer
      :is-menu-open="isMenuOpen"
      :links="links"
      @toggle-menu="toggleMenu"
    />
  </header>
</template>

<script setup>
import VLike from '~/components/icons/VLike.vue'
import VCart from '~/components/icons/VCart.vue'
import VCatalog from '~/components/icons/VCatalog.vue'
import VAccount from '~/components/icons/VAccount.vue'

const { user } = useAuth()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const links = ref([
  { to: '/favorites', label: 'Избранное', icon: markRaw(VLike) },
  { to: '/cart', label: 'Корзина', icon: markRaw(VCart) },
  { to: '/home', label: 'Каталог', icon: markRaw(VCatalog) },
])
</script>
