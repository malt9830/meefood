<template>
	<div class="relative h-[80vh] w-full bg-center bg-cover bg-fixed grid grid-rows-[2fr_3fr]">
		<div class="z-10 bg-emerald-500 flex items-end">
			<div class="max-w-4xl w-full mx-auto px-4">
				<AnimatedSlogan />
				<form class="flex gap-2 max-w-xl rounded-xl bg-white border-2 border-white">
					<Pin @click="getUserLocation" class="fill-gray-500 py-2 ml-2 h-10 cursor-pointer" />
					<input v-model="address" class="grow py-2 rounded-xl focus:outline-none" placeholder="Indtast din adresse" />
					<RouterLink to="/restaurants" class="inline-block text-center bg-emerald-500 border border-white text-white hover:bg-emerald-600 py-2 px-4 rounded-xl duration-200">Søg</RouterLink>
				</form>
				<!-- <p @click="getUserLocation" class="mt-2 text-white underline underline-offset-4 cursor-pointer duration-200">Brug nuværende placering</p> -->
			</div>
		</div>
		<div class="bg-[url('./assets/splash-image.png')] w-full bg-cover bg-center">
			<div class="w-full h-40 bg-[url('./assets/splash-image/banner-bottom.svg')] bg-no-repeat bg-center bg-cover transform -translate-y-1" />
		</div>
	</div>
</template>

<script setup>
import { useLocationStore } from "/src/stores/locationStore";

const locationStore = useLocationStore();

const address = ref("");

// Update location
locationStore.$subscribe((state) => {
	address.value = state.events.newValue;
});

// Adjust securement in Google API before building
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const key = "AIzaSyDkTlYsFLGYBZLggJBXm2ioiiinqj3Odt4";
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Get address when mounted
onMounted(() => {
	address.value = locationStore.address;
});

function getUserLocation() {
	// Get coordinates of current location
	navigator.geolocation.getCurrentPosition((pos) => {
		const lat = pos.coords.latitude;
		const lng = pos.coords.longitude;

		locationStore.updateLocation(lat, lng, "Testvej 123");

		// Dont use api while testing
		return;

		axios
			.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`)
			.then((res) => {
				console.log(res);
				// address.value = res.data.results[0].formatted_address
				locationStore.updateLocation(lat, lng, res.data.results[0].formatted_address);
			})
			.catch((err) => console.log(err));
	});
}
</script>
