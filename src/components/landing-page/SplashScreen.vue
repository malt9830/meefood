<template>
  <div class="relative h-[65vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed grid">
    <img class="absolute pointer-events-none w-3/5 hidden sm:block" src="/src/assets/splash-image/banner-desktop.png">
    <img class="absolute pointer-events-none w-full sm:hidden" src="/src/assets/splash-image/banner-mobile.png">
    <div class="z-10 self-center">
      <div class="max-w-4xl mx-auto p-4">
        <AnimatedSlogan/>
        <form class="flex gap-2 max-w-sm">
          <input v-model="address" class="grow px-4 py-2 rounded-xl focus:outline-none" placeholder="Adresse, postnummer eller by">
          <RouterLink to="/restaurants" class="inline-block text-center bg-emerald-500 text-white hover:bg-emerald-600 py-2 px-4 rounded-xl duration-200">Søg</RouterLink>
        </form>
        <p @click="getUserLocation" class="mt-2 text-white underline underline-offset-4 cursor-pointer duration-200">Use current location</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLocationStore } from '/src/stores/locationStore'

const store = useLocationStore()

const address = ref('')

const key = 'AIzaSyDkTlYsFLGYBZLggJBXm2ioiiinqj3Odt4'
    
function getUserLocation() {
  // Get coordinates of current location
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude
    const lng = pos.coords.longitude

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`)
      .then(res => {
        console.log(res)
        address.value = res.data.results[0].formatted_address
        store.updateLocation(lat, lng, res.data.results[0].formatted_address)
      })

  })
}
</script>