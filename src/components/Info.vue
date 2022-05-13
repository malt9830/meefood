<template>
  <Teleport to="body">
    <div
      class="fixed w-screen h-screen top-0 left-0 before:content-[''] before:block before:w-screen before:h-screen before:bg-black before:opacity-50"
    >
      <div
        class="w-1/2 h-3/4 overflow-scroll bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded grid grid-rows-3 drop-shadow"
      >
          <GoogleMap api-key="AIzaSyDBbFP79qNW3Yf1YYc0qeC8DccgOG_7HpQ" :center="center" :zoom="15" class="relative h-80">
    <Marker :options="{ position: center }" />
    <Close
            @click="$emit('closeInfo')"
            class="absolute top-0 right-0 h-10"
            :style="`fill: ${restaurant.colorSecondary}`"
          />
  </GoogleMap>

          
        <div class="flex flex-col m-5 gap-y-8 top-40 relative">
          <div class="flex flex-col gap-y-2">
          <h1 class="text-xl font-semibold">Åbningstider</h1>
          <div>
            <div class="flex justify-between">
              <p>Mandag</p>
              <p>{{ restaurant.mandag }}</p>
            </div>
            <div class="flex justify-between">
              <p>Tirsdag</p>
              <p>{{ restaurant.tirsdag }}</p>
            </div>
            <div class="flex justify-between">
              <p>Onsdag</p>
              <p>{{ restaurant.onsdag }}</p>
            </div>
            <div class="flex justify-between">
              <p>Torsdag</p>
              <p>{{ restaurant.torsdag }}</p>
            </div>
            <div class="flex justify-between">
              <p>Fredag</p>
              <p>{{ restaurant.fredag }}</p>
            </div>
            <div class="flex justify-between">
              <p>Lørdag</p>
              <p>{{ restaurant.lordag }}</p>
            </div>
            <div class="flex justify-between">
              <p>Søndag</p>
              <p>{{ restaurant.sondag }}</p>
            </div>
          </div>
          </div>
          <div class="flex flex-col gap-y-2 pb-5">
          <h1 class="text-xl font-semibold">Kontakt</h1>
          <div class="flex flex-col gap-y-2">
            <p>+45{{ restaurant.phone }}</p>
            <p>{{ restaurant.email }}</p>
            <p>{{ restaurant.address }}</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>

import { GoogleMap, Marker } from "vue3-google-map";
import {defineComponent, defineProps} from "@vue/runtime-core";

const component = defineComponent({
  components: {GoogleMap, Marker}
})


 const center = { lat: 55.694601998040376, lng: 12.550868343712878 };
const props = defineProps({
  info: Boolean,
  restaurant: Object,
});
</script>
