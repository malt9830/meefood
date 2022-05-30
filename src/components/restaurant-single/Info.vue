<template>
      <div class="fixed z-[60] w-screen h-screen top-0 left-0 grid">
        <div @click="$emit('closeInfo')" class="absolute left-0 top-0 h-full w-full bg-black/50" />
        <aside
          class="fixed place-self-center z-10 w-full h-full sm:w-3/4 lg:w-1/2 sm:h-3/4 bg-white rounded flex flex-col"
        >
          <div scrollable @scroll="infoScrolled" class="w-full grow overflow-auto pb-16">
            <!-- <CloseCircle @click="$emit('closeInfo')" class="ml-auto h-10 cursor-pointer" :style="`fill: ${restaurant.colorSecondary}`"/> -->
            <GoogleMap api-key="AIzaSyDBbFP79qNW3Yf1YYc0qeC8DccgOG_7HpQ" :center="center" :zoom="15" class="h-80">
              <Marker :options="{ position: center }" />
            </GoogleMap>
            <div class="flex flex-col gap-y-4 p-4 relative">
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
              <div class="flex flex-col gap-y-2 mx-3">
                <h1 class="text-xl font-semibold">Kontakt</h1>
                <div class="flex flex-col gap-y-2">
                  <p>+45{{ restaurant.phone }}</p>
                  <p>{{ restaurant.email }}</p>
                  <p>{{ restaurant.address }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute self-center bottom-0 flex w-[calc(100%-2rem)] py-4 bg-gradient-to-t from-white via-white/70">
            <button
              @click="$emit('closeInfo')"
              class="p-1.5 rounded w-40 mx-auto text-white duration-200 hover:opacity-75"
              :class="[ scrolledBottom ? 'shadow-card' : 'shadow-button']"
              :style="`background: ${restaurant.colorSecondary}`"
            >
              Luk info
            </button>
          </div>
        </aside>
      </div>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";
import {defineComponent, defineProps} from "@vue/runtime-core";

const component = defineComponent({
  components: {GoogleMap, Marker}
})
const center = { lat: 55.694601998040376, lng: 12.550868343712878 };
const props = defineProps({
  restaurant: Object,
});
const emits = defineEmits(['closeInfo'])

const scrolledBottom = ref(true)

function infoScrolled (e) {
  scrolledBottom.value = (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight)
}

onMounted(() => {
  // Add shadow to scrollable dishes
  const scrollable = document.querySelector('div[scrollable]')
  scrolledBottom.value = (scrollable.scrollHeight - scrollable.scrollTop === scrollable.clientHeight)
})
</script>

<style scoped>
.slide-enter-active aside,
.slide-leave-active aside {
  opacity: 1;
  transform: translateY(0%);
  transition-duration: 300ms;
}

.slide-enter-from aside,
.slide-leave-to aside {
  opacity: 0;
  transform: translateY(10%);
  transition-duration: 300ms;
}
</style>