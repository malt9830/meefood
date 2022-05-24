<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-emerald-50"
  >
    <Header class="bg-emerald-700" />

    <h1 class="m-10 pt-14 text-center text-4xl font-semibold text-emerald-800">
      Thank you for your order!
    </h1>

    <div v-if="levering" class="m-5">
      <p class="text-gray-500">Your order will be delivered at {{deliveryTime}}</p>
    </div>

    <div v-if="!levering">
      <p class="text-gray-500">Afhentning</p>
    </div>
    <GoogleMap
      api-key="AIzaSyDBbFP79qNW3Yf1YYc0qeC8DccgOG_7HpQ"
      :center="center"
      :zoom="15"
      class="h-80"
    >
      <Marker :options="{ position: center }" />
    </GoogleMap>
  </div>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";

const props = defineProps({
  restaurant: Object,
  levering: Boolean,
  deliveryDay: String,
  deliveryTime: String
});

const component = defineComponent({
  components: { GoogleMap, Marker },
});
const center = { lat: 55.694601998040376, lng: 12.550868343712878 };
</script>
