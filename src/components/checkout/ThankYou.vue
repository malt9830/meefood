<template>
  <div
    class="fixed z-50 top-0 left-0 w-screen h-screen grid items-center overflow-hidden bg-emerald-50"
  >
    <div class="h-full">
      <GoogleMap
        api-key="AIzaSyDBbFP79qNW3Yf1YYc0qeC8DccgOG_7HpQ"
        :center="center"
        :zoom="15"
        class="h-1/2"
      >
        <Marker :options="{ position: center }" />
      </GoogleMap>
      <div class="flex flex-col m-7 sm:m-10 sm:gap-y-10 sm:pt-5">
        <h1
          class="text-center text-2xl sm:text-4xl font-semibold text-emerald-600"
        >
          Tak for din bestilling hos {{ restaurant.name }}!
        </h1>
        <div v-if="deliveryMethod === 'levering'" class="m-5 text-center">
          <p class="text-gray-500">
            Din ordre vil blive leveret
            <span v-if="deliveryDay === 'I morgen'">i morgen </span
            ><span v-if="deliveryTime !== 'Hurtigst muligt'">kl. </span>
            <span class="font-semibold lowercase">{{ deliveryTime }}</span>
          </p>
        </div>
        <div v-if="deliveryMethod === 'afhentning'" class="m-5 text-center">
          <p class="text-gray-500">
            Din ordre kan afhentes
            <span v-if="deliveryDay === 'I morgen'">i morgen </span>
            <span v-if="deliveryTime === 'Hurtigst muligt'">kl. {{calculateTime}} </span>
            <span v-if="deliveryTime !== 'Hurtigst muligt'">kl. {{deliveryTime}}</span>
          </p>
        </div>
      </div>
      <button
        @click="
          () => {
            router.push('/');
            $emit('closeModals');
          }
        "
        class="block w-full max-w-xs bg-emerald-500 text-white text-xl text-center mx-auto px-3 py-2 rounded hover:opacity-75"
      >
        Tilbage til forsiden
      </button>
    </div>
  </div>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";

const props = defineProps({
  restaurant: Object,
  deliveryMethod: String,
  deliveryDay: String,
  deliveryTime: String,
});
const emits = defineEmits(["closeModals"]);

const calculateTime = computed(() => {
  const date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  minutes += 20;
  if (minutes > 59) {
    hour++;
    minutes -= 60;
  }
  return `${hour}`.padStart(2, 0) + ":" + `${minutes}`.padStart(2, 0)
})

const router = useRouter();

const component = defineComponent({
  components: { GoogleMap, Marker },
});
const center = { lat: 55.694601998040376, lng: 12.550868343712878 };
</script>
