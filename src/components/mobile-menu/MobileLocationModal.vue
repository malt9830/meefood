<template>
  <Teleport to="body">
    <Transition name="slide" :duration="400">
      <div v-if="showLocation" class="fixed left-0 bottom-0 z-20 w-full flex justify-end pb-16">
        <aside class="w-full z-10 bg-white flex flex-col p-8 rounded-t-2xl shadow-top">
          <p class="text-2xl text-gray-500 font-semibold mb-2">Anvend ny placering</p>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps(['showLocation'])
const emits = defineEmits(['closeLocation'])
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