<template>
  <Teleport to="body">
    <Transition name="slide" :duration="400">
      <div v-if="showBasket" class="fixed left-0 bottom-0 z-20 w-full flex justify-end pb-16">
        <aside class="w-full z-10 bg-white flex flex-col p-8 rounded-t-2xl shadow-top">
          <h2>basket</h2>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps(['showBasket'])
const emits = defineEmits(['closeBasket'])
</script>

<style scoped>
.slide-enter-active aside,
.slide-leave-active aside {
  transform: translateY(0%);
  transition-duration: 400ms;
}

.slide-enter-from aside,
.slide-leave-to aside {
  transform: translateY(100%);
  transition-duration: 400ms;
}
</style>