<template>
  <Teleport to="body" v-if="showMobileMenu">
    <div :class="[ (showFilter || showBasket || showLocation || showSearchRest) ? 'shadow-topline' : 'shadow-top' ]" class="fixed z-50 bottom-0 w-full bg-white h-16 grid grid-cols-4 items-center duration-300">
      <RouterLink v-if="routeName === 'home' || routeName === 'checkout'" to="/restaurants" aria-label="Til forsiden" @click="hideModals" class="w-full h-full grid cursor-pointer">
        <Restaurant class="h-8 w-auto m-auto fill-gray-500"/>
      </RouterLink>
      <button v-if="routeName === 'restaurants'" aria-label="Til restaurant-listen" @click="hideModals('filter'); showFilter = !showFilter" class="w-full h-full grid cursor-pointer">
        <Filter :class="[ showFilter ? 'fill-emerald-500' : 'fill-gray-500']" class="h-6 w-auto m-auto duration-200"/>
      </button>
      <button v-if="routeName === 'restaurant'" aria-label="Åbn kurven" @click="hideModals('basket'); showBasket = !showBasket" class="grid place-content-center w-full h-full cursor-pointer">
        <div class="grid grid-rows-1 grid-cols-1 place-content-center">
          <Bag2 :class="[ showBasket ? 'fill-emerald-500' : 'fill-gray-500']" class="h-12 w-auto m-auto p-2.5 col-span-full row-span-full duration-200"/>
          <span v-if="basketStore.basket.length > 0" :class="[ showBasket ? 'bg-gray-500' : 'bg-emerald-500']" class="grid place-content-center h-5 w-5 ml-auto mt-auto col-span-full row-span-full rounded-full duration-200">
            <p class="text-white text-xs">
              {{ basketStore.totalItems }}
            </p>
          </span>
        </div>
      </button>
      <button aria-label="Åbn indtastning af lokation" @click="hideModals('location'); showLocation = !showLocation" class="w-full h-full grid cursor-pointer">
        <Pin :class="[ showLocation ? 'fill-emerald-500' : 'fill-gray-500']" class="h-8 w-auto m-auto duration-200"/>
      </button>
      <button v-if="routeName === 'restaurant'" aria-label="Åbn søgning af retter" @click="hideModals('search-dish'); showSearchDish = !showSearchDish" class="w-full h-full grid cursor-pointer">
        <Search :class="[ showSearchDish ? 'fill-emerald-500' : 'fill-gray-500']" class="h-8 w-auto m-auto duration-200"/>
      </button>
      <button v-if="routeName !== 'restaurant'" aria-label="Åbn søgning af restauranter" @click="hideModals('search-rest'); showSearchRest = !showSearchRest" class="w-full h-full grid cursor-pointer">
        <Search :class="[ showSearchRest ? 'fill-emerald-500' : 'fill-gray-500']" class="h-8 w-auto m-auto duration-200"/>
      </button>
      <button aria-label="Åbn bruger-panelet" @click="hideModals('user'); showUser = !showUser" class="w-full h-full grid cursor-pointer">
        <User :class="[ showUser ? 'fill-emerald-500' : 'fill-gray-500']" class="h-8 w-auto m-auto duration-200"/>
      </button>
    </div>
    <Transition name="fade" :duration="300">
      <div v-if="showingModal" @mousedown="hideModals" class="fixed top-0 left-0 z-30 h-screen w-screen cursor-pointer bg-black opacity-50"/>
    </Transition>
    <MobileUserModal :showUser="showUser" @closeUser="showUser = false"/>
    <MobileFilterModal :showFilter="showFilter" @closeFilter="showFilter = false"/>
    <MobileBasketModal :showBasket="showBasket" @closeBasket="showBasket = false"/>
    <MobileLocationModal :showLocation="showLocation" @closeLocation="showLocation = false"/>
    <MobileSearchDishModal :showSearchDish="showSearchDish" @closeSearchDish="showSearchDish = false"/>
    <MobileSearchRestaurantModal :showSearchRest="showSearchRest" @closeSearchRest="showSearchRest = false"/>
  </Teleport>
</template>

<script setup>
import { useBasketStore } from "/src/stores/basketStore";

const basketStore = useBasketStore();
const route = useRoute()

const routeName = computed(() => {
  return route.name
})

const isMobile = ref(false)

const showFilter = ref(false)
const showBasket = ref(false)
const showLocation = ref(false)
const showSearchDish = ref(false)
const showSearchRest = ref(false)
const showUser = ref(false)

const showMobileMenu = computed(() => {return (isMobile.value === true ? true : false)})

const showingModal = computed(() => {return [showFilter, showBasket, showLocation, showSearchDish, showSearchRest, showUser].some(modal => modal.value === true)})

// Prevent scrolling body when a modal is open
watch(showingModal, (modal) => {document.querySelector("body").style.overflow = (modal ? 'hidden' : 'auto')})

onMounted(() => {
  isMobile.value = (window.innerWidth < 640 ? true : false)

  window.addEventListener('resize', () => {
    isMobile.value = (window.innerWidth < 640 ? true : false)
  })
})

function hideModals(modal) {
  if (modal !== 'filter') showFilter.value = false
  if (modal !== 'basket') showBasket.value = false
  if (modal !== 'location') showLocation.value = false
  if (modal !== 'search-dish') showSearchDish.value = false
  if (modal !== 'search-rest') showSearchRest.value = false
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