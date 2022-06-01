<template>
	<div class="relative h-[80vh] w-full bg-center bg-cover bg-fixed grid grid-rows-[2fr_3fr]">
		<div class="z-10 bg-emerald-500 flex items-end">
			<div class="max-w-4xl w-full mx-auto px-4">
				<AnimatedSlogan />
				<fieldset class="flex gap-2 max-w-xl rounded bg-white border-2 border-white group">
					<Pin @click="locationStore.getLocation" class="fill-gray-500 py-2 ml-2 h-10 group-focus-within:animate-twirl cursor-pointer" />
					<input v-model="address" class="grow w-full py-2 text-gray-700 rounded-xl focus:outline-none" placeholder="Indtast din adresse" />
					<button @click="findRestaurants" class="inline-block text-center bg-emerald-500 text-white hover:bg-emerald-600 py-1 m-0.5 px-3 rounded duration-200">Søg</button>
				</fieldset>
			</div>
		</div>
		<div class="w-full bg-[url('./assets/splash-image/splash-image-small.webp')] sm:bg-[url('./assets/splash-image/splash-image-large.webp')] bg-no-repeat sm:bg-fixed sm:bg-center bg-cover">
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
locationStore.$onAction(({ getLocation, after }) => { after(() => address.value = locationStore.address)})

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
