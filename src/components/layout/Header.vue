<template>
  <header :class="{'bg-emerald-500' : routeName === 'restaurants'}" class="absolute z-20 text-white w-full py-4 px-8">
      <nav class="max-w-7xl mx-auto flex flex-row justify-between items-center">
        <RouterLink to="/"><Logo/></RouterLink>  
        <div v-if="routeName !== 'home' && !isMobile" class="relative text-black place-self-center rounded-xl">
          <div class="absolute -z-10 top-0 left-0 w-full h-full bg-white opacity-70 rounded-xl pointer-events-none"/>
          <div class="flex flex-row gap-2">
            <img src="/src/assets/icons/vegan.svg" class="h-8 w-auto p-1">
            <input placeholder="Indtast din adresse" class="bg-transparent py-1 focus-visible:outline-none">
          </div>
        </div>
        <div v-if="!isMobile" class="flex flex-row gap-4 items-center">
          <RouterLink to="/restaurants">Restauranter</RouterLink>
          <RouterLink to="/" class="px-2 py-1 border border-white rounded-xl duration-200 hover:bg-white hover:text-black">Log ind</RouterLink>
        </div>
        <img v-if="isMobile" @click="showMenu = !showMenu" class="h-8 w-auto cursor-pointer transform duration-200 hover:scale-110" src="/src/assets/icons/filter.svg">
      </nav>
  </header>
</template>

<script setup>
const route = useRoute()

const routeName = computed(() => {
  return route.name
})

const showMenu = ref(false)

const isMobile = ref(false)

onMounted(() => {
  isMobile.value = (window.innerWidth < 767 ? true : false)

  window.addEventListener('resize', () => {
    isMobile.value = (window.innerWidth < 767 ? true : false)
  })
})
</script>
