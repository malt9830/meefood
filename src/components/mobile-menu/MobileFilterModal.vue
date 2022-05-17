<template>
  <Teleport to="body">
    <Transition name="slide" :duration="400">
      <div v-if="showFilter" class="fixed left-0 bottom-0 z-20 w-full flex justify-end pb-16">
        <aside class="w-full z-10 bg-white flex flex-col p-8 rounded-t-2xl shadow-top">
          <form class="flex flex-col grow">
            <fieldset class="flex flex-wrap gap-2">
              <legend class="text-2xl text-gray-500 font-semibold mb-2">Kategorier</legend>
              <div v-for="filter in store.filters" :key="filter" class="capitalize transform duration-200 active:scale-90">
                <input
                  type="checkbox" :id="filter" :value="filter" v-model="activeFilters"
                  class="peer appearance-none">
                <label
                  :for="filter"
                  class="inline-block bg-white text-emerald-500 px-3 py-1 border border-emerald-500 rounded-full cursor-pointer duration-200 peer-checked:bg-emerald-500 peer-checked:text-white hover:bg-emerald-50">
                    {{ filter }}
                </label>
              </div>
            </fieldset>
            <fieldset class="flex flex-wrap gap-2 mt-8">
              <legend class="text-2xl text-gray-500 font-semibold mb-2">Sortér efter</legend>
              <div v-for="sort in store.sorting" :key="sort" class="transform duration-200 active:scale-90">
                <input
                  type="radio" :id="sort" :value="sort" v-model="activeSorting"
                  class="peer appearance-none">
                <label
                  :for="sort"
                  class="inline-block bg-white text-emerald-500 px-3 py-1 border border-emerald-500 rounded-full cursor-pointer duration-200 peer-checked:bg-emerald-500 peer-checked:text-white hover:bg-emerald-50">
                    {{ sort }}
                </label>
              </div>
            </fieldset>
            <button @click="resetFilters" class="w-full bg-emerald-200 text-emerald-900 font-semibold rounded-full mt-8 py-4 transform duration-200 hover:bg-emerald-100 active:scale-95">Fjern filtre</button>
            <button @click="applyFilters" class="w-full bg-emerald-500 text-white font-semibold rounded-full mt-4 py-4 transform duration-200 hover:bg-emerald-600 active:scale-95">Anvend filtre</button>
          </form>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useFilterStore } from '/src/stores/filterStore'

const props = defineProps(['showFilter'])
const emits = defineEmits(['closeFilter'])

const store = useFilterStore()

const activeFilters = ref([])
const activeSorting = ref('Mest populære')

// Check when modal is opened
watch(props, () => {
  // Update refs based on store
  if(props.showFilter === true) {
    activeFilters.value = store.activeFilters
    activeSorting.value = store.activeSorting
  }
})

function applyFilters(e) {
  e.preventDefault()

  // Pass new filtering to store to update
  store.updateFilters(activeFilters.value, activeSorting.value)

  // Close modal after applying filters
  emits('closeFilter')
}

function resetFilters(e) {
  e.preventDefault()

  // Reset refs
  activeFilters.value = []
  activeSorting.value = 'Mest populære'

  // Reset store
  store.$reset()
}
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