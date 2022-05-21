<template>
  <Teleport to="body" v-if="isMobile && routeName !== 'home'">
    <div :class="[ (showFilter || showBasket || showLocation || showSearch) ? 'shadow-topline' : 'shadow-top' ]" class="fixed z-50 bottom-0 w-full bg-white h-16 grid grid-cols-3 items-center duration-300">
      <div v-if="routeName === 'restaurants'" @click="hideModals('filter'); showFilter = !showFilter" class="w-full h-full grid cursor-pointer">
        <Filter :class="[ showFilter ? 'fill-emerald-500' : 'fill-gray-500']" class="h-6 w-auto m-auto duration-200"/>
      </div>
      <div v-if="routeName === 'restaurant'" @click="hideModals('basket'); showBasket = !showBasket" class="w-full h-full grid cursor-pointer">
        <Bag2 :class="[ showBasket ? 'fill-emerald-500' : 'fill-gray-500']" class="h-6 w-auto m-auto duration-200"/>
      </div>
      <div @click="hideModals('location'); showLocation = !showLocation" class="w-full h-full grid cursor-pointer">
        <Pin :class="[ showLocation ? 'fill-emerald-500' : 'fill-gray-500']" class="h-8 w-auto m-auto duration-200"/>
      </div>
      <div @click="hideModals('search'); showSearch = !showSearch" class="w-full h-full grid cursor-pointer">
        <Search :class="[ showSearch ? 'fill-emerald-500' : 'fill-gray-500']" class="h-8 w-auto m-auto duration-200"/>
      </div>
    </div>
    <MobileFilterModal :showFilter="showFilter" @closeFilter="showFilter = false"/>
    <MobileBasketModal :showBasket="showBasket" @closeBasket="showBasket = false"/>
    <MobileLocationModal :showLocation="showLocation" @closeLocation="showLocation = false"/>
    <MobileSearchModal :showSearch="showSearch" @closeSearch="showSearch = false"/>
  </Teleport>
</template>

<script setup>
const route = useRoute()

const routeName = computed(() => {
  return route.name
})

const isMobile = ref(false)

onMounted(() => {
  isMobile.value = (window.innerWidth < 600 ? true : false)

  window.addEventListener('resize', () => {
    isMobile.value = (window.innerWidth < 600 ? true : false)
  })
})

const showFilter = ref(false)
const showBasket = ref(false)
const showLocation = ref(false)
const showSearch = ref(false)

function hideModals(modal) {
  if (modal !== 'filter') showFilter.value = false
  if (modal !== 'basket') showBasket.value = false
  if (modal !== 'location') showLocation.value = false
  if (modal !== 'search') showSearch.value = false
}
</script>