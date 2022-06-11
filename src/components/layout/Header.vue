<template>
  <header class="absolute z-20 text-white w-full">
    <div :class="{'pr-4' : showAddressMenu, 'bg-emerald-500' : routeName !== 'restaurant', 'bg-black/50' : routeName === 'restaurant' || routeName === 'checkout'}">
        <nav class="z-20 max-w-7xl mx-auto flex flex-row justify-between items-center px-4 py-3">
          <RouterLink to="/" aria-label="Til forsiden"><Logo class="h-8 w-auto"/></RouterLink>  
          <div v-if="routeName !== 'home' && !isMobile" @click="showAddressMenu = !showAddressMenu; address = ''" class="mx-2 max-w-sm bg-white/70 text-black grow place-self-center rounded-xl cursor-pointer">
            <form class="grow flex flex-row gap-2">
              <Pin class="py-2 ml-2 fill-gray-500 cursor-pointer" />
              <p class="grow bg-transparent p-1 flex items-center leading-none whitespace-nowrap">{{ locationStore.address }}<span v-if="locationStore.address === ''" class="text-gray-500">Hvor skal maden leveres?</span></p>
            </form>
          </div>
          <div v-if="!isMobile" class="flex flex-row gap-4 items-center">
            <RouterLink to="/restaurants" class="font-[500] tracking-wide duration-200 hover:opacity-75 cursor-pointer">Restauranter</RouterLink>
             <button @click="signUp = true" class="font-medium tracking-wide px-2 py-1 rounded duration-200 hover:opacity-75">Opret konto</button>
              <button @click="logIn = true" class="font-semibold tracking-wide px-2 py-1 border border-white rounded duration-200 hover:bg-white hover:text-black">Log ind</button>
          </div>
        </nav>
    </div>
    <Transition name="slide" :duration="200">
        <fieldset v-if="routeName !== 'home' && !isMobile && showAddressMenu" class="absolute -z-10 w-full text-black shadow-bottom">
          <div class="w-full bg-white py-2 pr-4">
            <div class="flex flex-row gap-2 max-w-lg mx-auto rounded-xl border-2 border-emerald-500 group overflow-hidden">
              <Pin @click="locationStore.getLocation" class="fill-gray-500 py-2 ml-2 h-10 group-focus-within:animate-twirl cursor-pointer" />
              <input v-model="address" class="grow py-2 rounded-xl focus:outline-none" placeholder="Indtast din adresse" />
              <button @click="findRestaurants(); showAddressMenu = false" class="inline-block text-center bg-emerald-500 text-white hover:bg-emerald-600 py-2 px-4 duration-200">Søg</button>
            </div>
          </div>
        </fieldset>
    </Transition>
    <Teleport to="body">
      <div v-if="showAddressMenu" @click="showAddressMenu = false" class="fixed top-0 left-0 h-screen w-screen bg-black/50" />
    </Teleport>
    <Teleport to="body">
      <LogIn v-if="logIn === true && isMobile === false" @closeLogIn="logIn = false"/>
    </Teleport>
     <Teleport to="body">
      <SignUp v-if="signUp === true && isMobile === false" @closeSignUp="signUp = false"/>
    </Teleport>
  </header>
</template>

<script setup>
import { useLocationStore } from '/src/stores/locationStore'
import { useFilterStore } from '/src/stores/filterStore'

const locationStore = useLocationStore()
const filterStore = useFilterStore()
const router = useRouter()
const route = useRoute()

const routeName = computed(() => {return route.name})

const showAddressMenu = ref(false)

const isMobile = ref(false)

const address = ref('')

const logIn = ref(false)

const signUp = ref(false)

watch(routeName, () => {showAddressMenu.value = false})

// Prevent scrolling body when a modal is open
watch(showAddressMenu, (modal) => {document.querySelector("body").style = (modal ? 'overflow: hidden; padding-right: 1rem' : 'overflow: auto')})

onMounted(() => {
  isMobile.value = (window.innerWidth < 640 ? true : false)

  window.addEventListener('resize', () => {
    isMobile.value = (window.innerWidth < 640 ? true : false)
  })
})

// Update location
locationStore.$onAction(({ getLocation, after }) => { after(() => address.value = locationStore.address)})

function findRestaurants () {
  // Reset filters and search value
  filterStore.$reset()

  // Switch to restaurant view
  if (routeName.value !== 'restaurants') router.push('/restaurants')

  // Update location
  locationStore.updateLocation(address.value)

  // Empty input field
  address.value = ''
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transform: translateY(0%);
  transition-duration: 200ms;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
  transition-duration: 200ms;
}

.slide-leave-active > div {
  padding-right: 0;
}
</style>