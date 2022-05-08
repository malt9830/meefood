<template>
  <Teleport to="body">
    <Transition name="slide">
      <div v-if="showFilter" class="fixed left-0 top-0 z-20 h-full w-full flex justify-end">
        <!-- <div @click="$emit('closeFilter')" class="absolute left-0 top-0 h-full w-full bg-black opacity-50" /> -->
        <aside class="h-full w-[25rem] max-w-full z-10 bg-white px-8 shadow-2xl">
          <span @click="$emit('closeFilter')">x</span>
          <div class="mt-20">
            <p class="text-2xl text-gray-500 font-semibold mt-8 mb-2">Filtrering</p>
            <fieldset class="flex flex-wrap gap-2">
              <div v-for="tag in categories" :key="tag">
                <p class="bg-white px-3 py-1 text-emerald-500 capitalize border border-emerald-500 rounded-full cursor-pointer duration-200 hover:text-white hover:bg-emerald-500 transform active:scale-95">{{ tag }}</p>
              </div>
            </fieldset>
            <p class="text-2xl text-gray-500 font-semibold mt-8 mb-2">Sortering</p>
            <fieldset class="flex flex-wrap gap-2">
              <div v-for="tag in sortables" :key="tag">
                <p class="bg-white px-3 py-1 text-emerald-500 capitalise border border-emerald-500 rounded-full cursor-pointer duration-200 hover:text-white hover:bg-emerald-500 transform active:scale-95">{{ tag }}</p>
              </div>
            </fieldset>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps(['showFilter'])
const emits = defineEmits(['closeFilter'])

const categories = ['italiensk', 'pizza', 'vegetar', 'salat', 'sandwich', 'burger', 'indisk', 'asiatisk', 'polsk', 'sushi', 'kebab', 'fisk']
const sortables = ['Mest populære', 'Nærmeste', 'Leveringspris', 'Leveringstid']

</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transform: translateX(0%);
  transition-duration: 300ms;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  transition-duration: 300ms;
}
</style>