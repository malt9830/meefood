<template>
  <Teleport to="body">
    <Transition name="slide" :duration="400">
      <div v-if="showSearchRest" class="fixed left-0 bottom-0 z-40 w-full flex justify-end pb-16">
        <aside class="w-full z-10 bg-white flex flex-col p-4 rounded-t-2xl shadow-top">
          <p class="text-2xl text-gray-500 font-semibold">Søg efter steder</p>
          <fieldset class="mt-4 border-2 border-gray-500 rounded-xl">
            <input v-model="restaurantSearch" placeholder="Indtast restaurantnavn" class="bg-transparent px-4 py-2 rounded-xl focus:outline-none">
          </fieldset>
          <button @click="resetSearch" class="w-full bg-emerald-200 text-emerald-900 font-semibold rounded-xl mt-4 py-4 transform duration-200 hover:bg-emerald-100 active:scale-95">Ryd søgning</button>
          <button @click="startSearch" class="w-full bg-emerald-500 text-white font-semibold rounded-xl mt-4 py-4 transform duration-200 hover:bg-emerald-600 active:scale-95">Find restauranter</button>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useFilterStore } from '/src/stores/filterStore'

const props = defineProps(['showSearchRest'])
const emits = defineEmits(['closeSearchRest'])

const filterStore = useFilterStore()
const router = useRouter()
const route = useRoute()

const routeName = computed(() => {
  return route.name
})

const restaurantSearch = ref('')

// Whenever filters are updated, clear search input
filterStore.$onAction(({ updateFilters }) => {restaurantSearch.value = ''})

function resetSearch(e) {
  e.preventDefault()

  // Clear input value
  restaurantSearch.value = ''

  // Reset filters and search value
  filterStore.$reset()
}

function startSearch(e) {
  e.preventDefault()

  // Push to restaurants view if not there
  if (routeName !== 'restaurants') router.push('/restaurants')

  // Reset filters and search value
  filterStore.$reset()

  // Update search value in filterStore
  filterStore.updateSearch(restaurantSearch.value.trim())

  // Close modal after applying filters
  emits('closeSearchRest')
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