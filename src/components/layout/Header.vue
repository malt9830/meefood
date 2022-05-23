<template>
  <header :class="{'bg-emerald-500' : routeName === 'restaurants'}" class="absolute z-20 text-white w-full py-3 px-4">
      <nav class="max-w-7xl mx-auto flex flex-row justify-between items-center">
        <RouterLink to="/"><Logo/></RouterLink>  
        <div v-if="routeName !== 'home' && !isMobile" class="relative grow max-w-sm text-black place-self-center rounded-xl">
          <div class="absolute -z-10 top-0 left-0 w-full h-full bg-white opacity-70 rounded-xl pointer-events-none"/>
          <form class="flex flex-row gap-2">
            <Pin class="py-1 ml-2 fill-gray-500" />
            <input v-model="address" placeholder="Indtast din adresse" class="grow bg-transparent py-1 focus-visible:outline-none">
          </form>
        </div>
        <div v-if="!isMobile" class="flex flex-row gap-4 items-center">
          <RouterLink to="/restaurants">Restauranter</RouterLink>
          <RouterLink to="/" class="px-2 py-1 border border-white rounded-xl duration-200 hover:bg-white hover:text-black">Log ind</RouterLink>
        </div>
      </nav>
  </header>
</template>

<script setup>
import { useLocationStore } from '/src/stores/locationStore'

const locationStore = useLocationStore()
const route = useRoute()

const routeName = computed(() => {
  return route.name
})

const showMenu = ref(false)

const isMobile = ref(false)

const address = ref('')

// Update location
locationStore.$subscribe((state) => {address.value = state.events.newValue})

onMounted(() => {
  isMobile.value = (window.innerWidth < 767 ? true : false)

  window.addEventListener('resize', () => {
    isMobile.value = (window.innerWidth < 767 ? true : false)
  })
})
</script>
