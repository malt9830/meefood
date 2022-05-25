<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-emerald-50"
  >

    <GoogleMap
      api-key="AIzaSyDBbFP79qNW3Yf1YYc0qeC8DccgOG_7HpQ"
      :center="center"
      :zoom="15"
      class="h-80 mt-14"
    >
      <Marker :options="{ position: center }" />
    </GoogleMap>

    <div class="flex flex-col m-7 sm:m-10 sm:gap-y-10 sm:pt-5">

    <h1 class=" text-center text-2xl sm:text-4xl font-semibold text-emerald-600">
      Tak for din bestilling hos {{restaurant.name}}!
    </h1>

    <div v-if="deliveryMethod === 'levering'" class="m-5 text-center">
      <p class="text-gray-500">Din ordre vil blive leveret <span v-if="deliveryDay === 'I morgen'">i morgen </span><span v-if="deliveryTime !== 'Hurtigst muligt'">kl. </span> <span class="font-semibold lowercase">{{deliveryTime}}</span></p>
    </div>

    <div v-if="deliveryMethod === 'afhentning'" class="m-5 text-center">
      <p class="text-gray-500">Din ordre kan afhentes <span v-if="deliveryDay === 'I morgen'">i morgen </span> <span v-if="deliveryTime !== 'Hurtigst muligt'">kl. </span> <span class="font-semibold lowercase">{{deliveryTime}}</span></p>
    </div>

    </div>
  </div>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";

const props = defineProps({
  restaurant: Object,
  deliveryMethod: String,
  deliveryDay: String,
  deliveryTime: String
});

console.log(props)

const component = defineComponent({
  components: { GoogleMap, Marker },
});
const center = { lat: 55.694601998040376, lng: 12.550868343712878 };
</script>
