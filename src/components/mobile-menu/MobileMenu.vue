<template>
  <Teleport to="body" v-if="showMobileMenu">
    <div :class="[ (showFilter || showBasket || showLocation || showSearch) ? 'shadow-topline' : 'shadow-top' ]" class="fixed z-50 bottom-0 w-full bg-white h-16 grid grid-cols-4 items-center duration-300">
      <RouterLink to="restaurants" v-if="routeName === 'home'" @click="hideModals" class="w-full h-full grid cursor-pointer">
        <Restaurant class="h-8 w-auto m-auto fill-gray-500"/>
      </RouterLink>
      <div v-if="routeName === 'restaurants'" @click="hideModals('filter'); showFilter = !showFilter" class="w-full h-full grid cursor-pointer">
        <Filter :class="[ showFilter ? 'fill-emerald-500' : 'fill-gray-500']" class="h-6 w-auto m-auto duration-200"/>
      </div>
      <div v-if="routeName === 'restaurant' || routeName === 'checkout'" @click="hideModals('basket'); showBasket = !showBasket" class="w-full h-full grid cursor-pointer">
        <Bag2 :class="[ showBasket ? 'fill-emerald-500' : 'fill-gray-500']" class="h-6 w-auto m-auto duration-200"/>
      </div>
      <div @click="hideModals('location'); showLocation = !showLocation" class="w-full h-full grid cursor-pointer">
        <Pin :class="[ showLocation ? 'fill-emerald-500' : 'fill-gray-500']" class="h-8 w-auto m-auto duration-200"/>
      </div>
      <div @click="hideModals('search'); showSearch = !showSearch" class="w-full h-full grid cursor-pointer">
        <Search :class="[ showSearch ? 'fill-emerald-500' : 'fill-gray-500']" class="h-8 w-auto m-auto duration-200"/>
      </div>
      <div @click="hideModals('user'); showUser = !showUser" class="w-full h-full grid cursor-pointer">
        <User :class="[ showUser ? 'fill-emerald-500' : 'fill-gray-500']" class="h-8 w-auto m-auto duration-200"/>
      </div>
    </div>
    <Transition name="fade" :duration="300">
      <div v-if="showingModal" @mousedown="hideModals" class="fixed top-0 left-0 z-30 h-screen w-screen cursor-pointer bg-black opacity-50"/>
    </Transition>
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

const showFilter = ref(false)
const showBasket = ref(false)
const showLocation = ref(false)
const showSearch = ref(false)
const showUser = ref(false)

const showMobileMenu = computed(() => {
  return (isMobile.value === true ? true : false)
})

const showingModal = computed(() => {
  return [showFilter, showBasket, showLocation, showSearch, showUser].some(modal => modal.value === true)
})

// Prevent scrolling body when a modal is open
watch(showingModal, (modal) => {document.querySelector("body").style.overflow = (modal ? 'hidden' : 'auto')})

onMounted(() => {
  isMobile.value = (window.innerWidth < 600 ? true : false)

  window.addEventListener('resize', () => {
    isMobile.value = (window.innerWidth < 600 ? true : false)
  })
})

function hideModals(modal) {
  if (modal !== 'filter') showFilter.value = false
  if (modal !== 'basket') showBasket.value = false
  if (modal !== 'location') showLocation.value = false
  if (modal !== 'search') showSearch.value = false
  if (modal !== 'user') showUser.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  height: 100vh;
  opacity: 0.5;
  transition-duration: 300ms;
}

.fade-enter-from,
.fade-leave-to {
  height: 0vh;
  opacity: 0;
  transition-duration: 300ms;
}
</style>