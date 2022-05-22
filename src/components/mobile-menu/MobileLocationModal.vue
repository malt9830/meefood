<template>
  <Teleport to="body">
    <Transition name="slide" :duration="400">
      <div v-if="showLocation" class="fixed left-0 bottom-0 z-40 w-full flex justify-end pb-16">
        <aside class="w-full z-10 bg-white p-4 rounded-t-2xl shadow-top">
          <p class="text-2xl text-gray-500 font-semibold">Brug anden adresse?</p>
          <p class="text-sm">Indtast en ny adresse og find de bedste og nærmeste spisesteder.</p>
          <fieldset class="bg-gray-300 mt-4 border-2 border-gray-500 rounded-xl cursor-not-allowed">
            <legend class="text-xs mx-3 px-1">Nuværrende adresse</legend>
            <input v-model="currentAddress" placeholder="Ingen" disabled class="bg-transparent px-4 py-2 rounded-xl focus:outline-none pointer-events-none">
          </fieldset>
          <fieldset class="mt-4 border-2 border-gray-500 rounded-xl">
            <legend class="text-xs mx-3 px-1">Ny adresse</legend>
            <input v-model="newAddress" placeholder="Adresse, postnummer eller by" class="bg-transparent px-4 py-2 rounded-xl focus:outline-none">
          </fieldset>
          <button @click="findRestaurants" class="w-full bg-emerald-500 text-white font-semibold text-center rounded-xl mt-4 py-4 transform duration-200 hover:bg-emerald-600 active:scale-95">Find nærmeste</button>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useFilterStore } from '/src/stores/filterStore'

const props = defineProps(['showLocation'])
const emits = defineEmits(['closeLocation'])

const store = useFilterStore()
const router = useRouter()

const currentAddress = ref('Test Allé 123')
const newAddress = ref('')

function findRestaurants(e) {
  e.preventDefault()

  // Reset filters and search value
  store.$reset()

  // Switch to restaurant view
  router.push('/restaurants')

  // Close modal after switching view
  emits('closeLocation')
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