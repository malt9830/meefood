<template>
	<div class="relative h-[80vh] w-full bg-center bg-cover bg-fixed grid grid-rows-[2fr_3fr]">
		<div class="z-10 bg-emerald-500 flex items-end">
			<div class="max-w-4xl w-full mx-auto px-4">
				<AnimatedSlogan />
				<fieldset class="flex gap-2 max-w-xl rounded-xl bg-white border-2 border-white">
					<Pin @click="locationStore.getLocation" class="fill-gray-500 py-2 ml-2 h-10 cursor-pointer" />
					<input v-model="address" class="grow py-2 rounded-xl focus:outline-none" placeholder="Indtast din adresse" />
					<button @click="findRestaurants" class="inline-block text-center bg-emerald-500 border border-white text-white hover:bg-emerald-600 py-2 px-4 rounded-xl duration-200">Søg</button>
				</fieldset>
			</div>
		</div>
		<div class="bg-[url('./assets/splash-image.png')] w-full bg-cover bg-center">
			<div class="w-full h-40 bg-[url('./assets/splash-image/banner-bottom.svg')] bg-no-repeat bg-center bg-cover transform -translate-y-1" />
		</div>
	</div>
</template>

<script setup>
import { useLocationStore } from "/src/stores/locationStore"
import { useFilterStore } from '/src/stores/filterStore'

const locationStore = useLocationStore()
const filterStore = useFilterStore()
const router = useRouter()

const address = ref("")

// Update location
locationStore.$subscribe((state) => {address.value = state.events.newValue});

// Get address when mounted
onMounted(() => {address.value = locationStore.address})

function findRestaurants () {
  // Reset filters and search value
  filterStore.$reset()

  // Switch to restaurant view
  router.push('/restaurants')

  // Update location
  locationStore.updateLocation(address.value)
}
</script>
