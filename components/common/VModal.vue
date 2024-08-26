<script setup>
const modalStore = useModalStore()
const loadingStore = useLoadingStore()

const closeModal = () => {
  modalStore.closeModal()
}

const Component = computed(() => modalStore.currentComponent)
const componentProps = computed(() =>
  modalStore.state.itemId ? { itemId: modalStore.state.itemId } : null
)

const loading = computed(() => loadingStore.loading)
</script>

<template>
  <!--  <Teleport to="body">-->
  <div
    v-if="modalStore.state.isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    @click="closeModal"
  >
    <div class="px-72 py-20 z-52" @click.stop>
      <div class="bg-gray-500 p-6 rounded shadow-lg relative" @click.stop>
        <button class="absolute top-1 right-1" @click="closeModal">
          <icons-v-cross
            class="hover:fill-gray-700 transition duration-300 w-6 h-6"
          />
        </button>
        <component
          :is="Component"
          :loading="loading"
          v-bind="componentProps"
          @close-modal="closeModal"
          @switch-to="modalStore.switchModal"
        />
      </div>
    </div>
  </div>
  <!--  </Teleport>-->
</template>
