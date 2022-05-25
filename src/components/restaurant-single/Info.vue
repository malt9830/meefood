<template>
  <Teleport to="body">
    <div class="fixed z-30 w-screen h-screen top-0 left-0">
      <div @click="$emit('closeInfo')" class="absolute left-0 top-0 h-full w-full bg-black/50" />
      <div
        class="w-screen sm:w-3/4 lg:w-1/2 h-screen sm:h-3/4 bg-white sm:overflow-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded flex flex-col sm:grid sm:grid-rows-3"
      >
          <GoogleMap api-key="AIzaSyDBbFP79qNW3Yf1YYc0qeC8DccgOG_7HpQ" :center="center" :zoom="15" class="h-80">
            <Marker :options="{ position: center }" />
            <CloseCircle
                    @click="$emit('closeInfo')"
                    class="fixed top-0 right-0 h-10 cursor-pointer"
                    :style="`fill: ${restaurant.colorSecondary}`"
                  />
        </GoogleMap>
        
        <div class="flex flex-col mx-5 gap-y-8 pt-32 lg:top-16 relative">
          <div class="flex flex-col gap-y-2 mx-3">
          <h1 class="text-xl font-semibold">Åbningstider</h1>
          <div>
            <div class="flex justify-between">
              <p>Mandag</p>
              <p>{{ restaurant.monday }}</p>
            </div>
            <div class="flex justify-between">
              <p>Tirsdag</p>
              <p>{{ restaurant.tuesday }}</p>
            </div>
            <div class="flex justify-between">
              <p>Onsdag</p>
              <p>{{ restaurant.wednesday }}</p>
            </div>
            <div class="flex justify-between">
              <p>Torsdag</p>
              <p>{{ restaurant.thursday }}</p>
            </div>
            <div class="flex justify-between">
              <p>Fredag</p>
              <p>{{ restaurant.friday }}</p>
            </div>
            <div class="flex justify-between">
              <p>Lørdag</p>
              <p>{{ restaurant.saturday }}</p>
            </div>
            <div class="flex justify-between">
              <p>Søndag</p>
              <p>{{ restaurant.sunday }}</p>
            </div>
          </div>
          </div>
          <div class="flex flex-col gap-y-2 pb-8 mx-3">
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
const emits = defineEmits(['closeInfo'])

</script>
