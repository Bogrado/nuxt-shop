<template>
  <div>
    <common-v-preloader />
    <!--    <pages-v-page-header title="Главная страница" />-->
    <!-- Нижний блок с сеткой товаров -->
    <!--    <lazy-pages-home-v-products-section>-->
    <!--      <template #default-->
    <!--        ><h2 class="text-2xl font-bold p-4">Выгодные цены!</h2></template-->
    <!--      >-->
    <!--    </lazy-pages-home-v-products-section>-->
  </div>
</template>

<script setup>
const router = useRouter()
onMounted(() => {
  router.push('/home')
})
</script>
