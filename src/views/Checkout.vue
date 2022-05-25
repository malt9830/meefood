<template>
  <main :class="textColor">
    <div
      v-if="!loaded"
      class="h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"
    ></div>
    <div v-if="loaded" :style="`background-color: ${restaurant.colorPrimary}`" class="pb-10">
      <div
        :style="`background-image: url(${restaurant.splash[0].url})`"
        class="h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"
      ></div>
      <div class="relative flex flex-col sm:flex-row items-center sm:ml-10">
        <div
          :style="`border: 2px solid ${restaurant.colorSecondary}; background-image: url(${restaurant.logo[0].url}); background-size: contain; background-repeat: no-repeat`"
          class="w-40 h-40 absolute -top-16 sm:left-0 sm:m-4 rounded-full bg-white flex justify-center items-center"
        ></div>
        <div
          class="sm:ml-48 flex w-full flex-col items-center sm:items-start pt-24 sm:pt-0"
        >
          <h1
            v-if="loaded"
            class="text-2xl sm:text-3xl font-semibold p-3 sm:p-5"
          >
            {{ restaurant.name }}
          </h1>
        </div>
      </div>
        <div class="flex flex-col-reverse max-w-5xl mx-auto my-10 px-4 md:grid md:grid-cols-2 gap-y-10 gap-x-10 sm:gap-x-28 justify-center">
          <div class="flex flex-col gap-y-5">
            <!-- Delivery method -->
            <fieldset class="w-80 max-w-full mx-auto sm:mx-0 mt-10 flex justify-center rounded overflow-hidden">
              <div v-for="method in deliveryMethods" :key="method" class="w-full text-center capitalize">
                <input v-model="deliveryMethod" :value="method" :id="method" type="radio" class="peer appearance-none">
                <label :for="method" :style="`background-color: ${restaurant.colorSecondary}`" class="inline-block w-full py-2 cursor-pointer duration-200 opacity-60 peer-checked:opacity-100">{{ method }}</label>
              </div>
            </fieldset>
            <div class="flex flex-col my-5">

              <!-- Delivery time -->
              <div class="space-y-3 mb-10">
                <h2 class="font-semibold text-xl">{{ deliveryMethod === 'levering' ? 'Leveringstid' : 'Afhentningstid' }}</h2>
                <div class="flex gap-x-5">

                  <select v-model="deliveryDay" class="p-1.5 rounded bg-white text-gray-600">
                    <option>I dag</option>
                    <option>I morgen</option>
                  </select>

                  <select v-model="deliveryTime" class="p-1.5 rounded bg-white text-gray-600">
                    <option>Hurtigst muligt</option>
                    <option v-for="time in deliveryHours" :key="time">{{ time }}</option>
                  </select>

                </div>
              </div>

              <!-- Delivery address -->
              <Transition name="fade" :duration="500" >
                <form delivery-form v-if="deliveryMethod === 'levering'" class="space-y-4 mb-10 max-h-[40rem] max-w-xl overflow-hidden">
                  <h2 class="font-semibold text-xl">Leveringsadresse</h2>

                  <div>
                    <input
                      v-model="fullName"
                      :class="{ 'invalid:border-red-500 invalid:bg-red-100 valid:border-green-500 valid:bg-green-200' : formSubmitted }"
                      class="appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Fulde navn"
                      name="fullName"
                      id="fullName"
                      type="text"
                      required
                    />
                  </div>

                  <div>
                    <input
                      v-model="streetName"
                      :class="{ 'invalid:border-red-500 invalid:bg-red-100 valid:border-green-500 valid:bg-green-50' : formSubmitted }"
                      class="appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Vejnavn og nummer"
                      name="streetName"
                      id="streetName"
                      type="text"
                      required
                    />
                  </div>

                  <div class="grid grid-cols-[1fr_auto] gap-4">
                    <div class="grow">
                      <input
                        v-model="city"
                      :class="{ 'invalid:border-red-500 invalid:bg-red-100 valid:border-green-500 valid:bg-green-50' : formSubmitted }"
                        class="appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        placeholder="By"
                        name="city"
                        id="city"
                        type="text"
                        required
                      />
                    </div>
                    <div>
                      <input
                        v-model="zip"
                      :class="{ 'invalid:border-red-500 invalid:bg-red-100 valid:border-green-500 valid:bg-green-50' : formSubmitted }"
                        class="appearance-none border-2 rounded w-24 m-0 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        placeholder="Post nr."
                        name="zip"
                        id="zip"
                        type="number"
                        min="1000"
                        max="9990"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      v-model="email"
                      :class="{'invalid:border-red-500 invalid:bg-red-100 valid:border-green-500 valid:bg-green-50' : formSubmitted}"
                      class="appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Email"
                      name="email"
                      id="email"
                      type="email"
                      required
                    />
                  </div>

                  <div>
                    <input
                      v-model="phone"
                      :class="{ 'invalid:border-red-500 invalid:bg-red-100 valid:border-green-500 valid:bg-green-50' : formSubmitted }"
                      class="relative appearance-none border-2 rounded w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Telefonnummer"
                      name="phone"
                      id="phone"
                      type="tel"
                      pattern="([0-9]{8})|([0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2})|([0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2})"
                      required
                    />
                  </div>

                </form>
              </Transition>

              <!-- Payment method -->
              <fieldset class="space-y-3">
                <h2 class="font-semibold text-xl">Betalingsmetoder</h2>
                <div v-for="method in paymentMethods" :key="method" class="inline-flex w-14 mr-2">
                  <input v-model="paymentMethod" :value="method" :id="method" type="radio" class="peer appearance-none">
                  <label :for="method" class="block cursor-pointer border-2 grayscale opacity-70 duration-200 hover:grayscale-0 hover:opacity-100 peer-checked:grayscale-0 peer-checked:opacity-100">
                    <img :src="`../cards/${method}.jpg`">
                  </label>
                </div>
              </fieldset>

            </div>
          </div>

          <div class="md:sticky top-0 mt-5 md:mt-0 md:pt-10 h-fit">
            <div
              :style="`border: 2px solid ${restaurant.colorSecondary}`"
              class="flex flex-col gap-y-5 p-7 h-fit rounded-2xl"
            >
              <h2 class="text-center font-semibold text-2xl">Din bestilling</h2>
              <div
                v-for="dish in store.basket"
                :key="dish.name"
                class="flex flex-col"
              >
                <div class="flex justify-between items-center">
                  <h3 class="text-md">{{ dish.amount }}x {{ dish.name }}</h3>
                  <p class="text-sm">{{ dish.amount * dish.price }} kr</p>
                </div>
                <div class="flex justify-start items-center gap-x-5">
                  <p class="text-xs" v-if="dish.options">{{ dish.picked }}</p>
                  <p v-if="!dish.comment && !dish.options"></p>
                  <p class="text-xs" v-if="dish.comment">"{{ dish.comment }}"</p>
                </div>
              </div>
              <hr :style="`border-color: ${restaurant.colorSecondary}`" />
              <div class="flex flex-col gap-y-4">
                <div class="flex justify-between">
                  <p class="font-semibold">Subtotal</p>
                  <p>{{ store.totalPrice }} kr</p>
                </div>
                <div class="flex justify-between">
                  <p class="font-semibold">Levering</p>
                  <p>{{ restaurant.deliveryCost }} kr</p>
                </div>
                <div class="flex justify-between">
                  <p class="font-semibold">Samlet</p>
                  <p>{{ store.totalPrice + restaurant.deliveryCost }} kr</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="md:ml-20 flex flex-wrap justify-center gap-4 px-2">
          <button @click="router.back()" :style="`color: ${restaurant.colorSecondary}; border: 1px solid ${restaurant.colorSecondary}`" class="rounded-2xl py-2 px-4 bg-white hover:opacity-75 self-center">Tilbage til menuen</button>
          <button @click="validateForm" :style="`background-color: ${restaurant.colorSecondary}`" class="rounded-2xl py-2 px-4 text-white hover:opacity-75 self-center">Fortsæt til betaling</button>
        </div>
    </div>
    
    <PaymentCard v-if="formValid" :restaurant="restaurant" :deliveryMethod="deliveryMethod" :deliveryDay="deliveryDay" :deliveryTime="deliveryTime"/>
  </main>
</template>

<script setup>
import Airtable from "airtable";
import { useBasketStore } from "/src/stores/basketStore";

const store = useBasketStore()
const router = useRouter()
const route = useRoute()

const loaded = ref(false)
const restaurant = ref()

const deliveryMethods = ['levering', 'afhentning']
const deliveryMethod = ref('levering')

const paymentMethods = ['visa', 'mastercard', 'dankort', 'mobilepay']
const paymentMethod = ref('visa')

const deliveryDay = ref("I dag")
const deliveryTime = ref("Hurtigst muligt")

const openingHours = computed(() => {
  const date = new Date()
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  // Get today or tomorrow based on deliveryDay
  const day = days[date.getDay() + (deliveryDay.value === 'I morgen' ? 1 : 0)]

  return restaurant.value[day]
})

const deliveryHours = computed(() => {
  const delHours = []
  const date = new Date()
  
  let hour = date.getHours()
  let min = (date.getMinutes() + (15 - ( date.getMinutes() % 15)))

  // If prior to opening hours set to opening hour
  if (hour < parseInt(openingHours.value.slice(0, 2))) {
    hour = parseInt(openingHours.value.slice(0, 2))
    min = parseInt(openingHours.value.slice(3, 5))
  }

  while (hour < parseInt(openingHours.value.slice(8, 10))) {
    // Increment min by 15 if below 45
    if (min < 60) {
      // Add time
      delHours.push(`${hour}`.padStart(2, '0') + ':' + `${min}`.padEnd(2, '0'))
      min += 15
    } else {
      // Increment hour by 1 and reset min
      hour++
      min = 0

      // Add time
      if (hour === parseInt(openingHours.value.slice(8, 10)) && min === parseInt(openingHours.value.slice(11, 13))) {delHours.push(`${hour}`.padStart(2, '0') + ':' + `${min}`.padEnd(2, '0'))}
    }
  }
  return delHours
})

const formSubmitted = ref(false)
const formValid = ref(false)
const fullName = ref("")
const streetName = ref("")
const city = ref("")
const zip = ref("")
const email = ref("")
const phone = ref("")

function validateForm () {
  if (deliveryMethod.value === "levering") {
    formValid.value = document.querySelector("[delivery-form]").checkValidity()
    formSubmitted.value = true
  } else if (deliveryMethod.value === "afhentning") {
    formValid.value = true
  }
}

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "keyiA3gmotxYIJjLc",
});

var base = Airtable.base("appRiP6vD6l7EmCYB");

base("restaurants")
  .select({
    filterByFormula: `{slug} = '${route.params.id}'`,
  })
  .eachPage((res) => {
    restaurant.value = res[0].fields;

    loaded.value = true
  });

const textColor = computed(() => {
  //Parse integers from hexadecimal to decimal
  const r = parseInt(restaurant.value?.colorPrimary.substring(1, 3), 16);
  const g = parseInt(restaurant.value?.colorPrimary.substring(3, 5), 16);
  const b = parseInt(restaurant.value?.colorPrimary.substring(5, 7), 16);

  // Calculate luminance, i.e. measurement of brightness
  const luminance = Math.round(r * 0.2126 + g * 0.7152 + b * 0.0722);

  // Return Tailwind text class of black or white based on brightness
  return luminance > 150 ? "text-black" : "text-white";
});
</script>

<style scoped>
/* Hide number arrows on inputs */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none; 
}
/* Animation for transitiong between delivery methods */
.fade-enter-active,
.fade-leave-active {
  max-height: 40rem;
  transition-timing-function: ease-in;
  transition-duration: 500ms;
}

.fade-enter-from,
.fade-leave-to {
  margin-bottom: 0;
  max-height: 0rem;
  transition-timing-function: ease-out;
  transition-duration: 500ms;
}
</style>
