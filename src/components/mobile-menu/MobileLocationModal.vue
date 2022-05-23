<template>
  <Teleport to="body">
    <Transition name="slide" :duration="400">
      <div v-if="showLocation" class="fixed left-0 bottom-0 z-40 w-full flex justify-end pb-16">
        <aside class="w-full z-10 bg-white p-4 rounded-t-2xl shadow-top">
          <p class="text-2xl text-gray-500 font-semibold">Brug anden adresse?</p>
          <p class="text-sm">Indtast en ny adresse og find de bedste og nærmeste spisesteder.</p>
          <fieldset class="mt-4 border-2 border-gray-500 rounded-xl">
            <input v-model="address" placeholder="Indtast din adresse" class="bg-transparent w-full px-4 py-2 rounded-xl focus:outline-none">
          </fieldset>
          <button @click="locationStore.getLocation" class="w-full bg-emerald-200 text-emerald-900 font-semibold rounded-xl mt-4 py-4 transform duration-200 hover:bg-emerald-100 active:scale-95">Brug placering</button>
          <button @click="emits('closeLocation'); findRestaurants()" class="w-full bg-emerald-500 text-white font-semibold text-center rounded-xl mt-4 py-4 transform duration-200 hover:bg-emerald-600 active:scale-95">Find nærmeste</button>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useLocationStore } from '/src/stores/locationStore'
import { useFilterStore } from '/src/stores/filterStore'

const props = defineProps(['showLocation'])
const emits = defineEmits(['closeLocation'])

const locationStore = useLocationStore()
const filterStore = useFilterStore()
const router = useRouter()

const address = ref('')

// Update location
locationStore.$subscribe((state) => {address.value = state.events.newValue});

// Get address when mounted
onMounted(() => {address.value = locationStore.address})

function findRestaurants() {
  // Reset filters and search value
  filterStore.$reset()

  // Switch to restaurant view
  router.push('/restaurants')

  // Update location
  locationStore.updateLocation(address.value)
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