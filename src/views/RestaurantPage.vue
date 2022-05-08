<template>
  <main>
    <div
      v-if="!loaded"
      class="h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"
    ></div>
    <div v-if="loaded" :style="`background-color: ${restaurant.colorPrimary}`">
      <div
        :style="`background-image: url(${restaurant.splash[0].url})`"
        class="h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"
      >
        >
      </div>
      <div class="flex items-center ml-10 -mt-24">
        <div
          :style="`border: 2px solid ${restaurant.colorSecondary}`"
          class="w-40 h-40 rounded-full bg-white flex justify-center items-center"
        >
          <img :src="restaurant.logo[0].url" class="p-8" />
        </div>
        <div class="flex flex-col">
          <h1 v-if="loaded" class="text-3xl font-semibold p-12">
            {{ restaurant.name }}
          </h1>
          <div class="flex justify-between gap-x-10 items-center">
            <p>{{ restaurant.tags }}</p>
            <div class="flex gap-x-2">
              <img src="../assets/icons/smile1.svg" class="h-6"/>
              <p>{{ restaurant.rating }}</p>
            </div>
            <div class="flex gap-x-2">
              <img src="../assets/icons/bike.svg" class="h-6"/>
              <p>{{ restaurant.deliveryCost }}kr</p>
            </div>
            <div class="flex gap-x-2">
              <img src="../assets/icons/time.svg" class="h-6"/>
              <p>{{ restaurant.deliveryTime }}min</p>
            </div>
            <div class="flex gap-x-2">
              <img src="../assets/icons/bag.svg" class="h-6"/>
              <p>Min. {{ restaurant.minimumPrice }}kr</p>
            </div>
            <div class="flex">
              <img src="../assets/icons/dollar-green.svg" class="h-6"/>
              <img
                v-if="restaurant.priceRange > 1"
                src="../assets/icons/dollar-green.svg" class="h-6"
              />
              <img
                v-if="restaurant.priceRange > 2"
                src="../assets/icons/dollar-green.svg" class="h-6"
              />
              <img
                v-if="restaurant.priceRange > 3"
                src="../assets/icons/dollar-green.svg" class="h-6"
              />
            </div>
            <p>www.restaurant.dk</p>
            <button
              :style="`background-color: ${restaurant.colorSecondary}`"
              class="p-1.5 text-white rounded"
            >
              More info
            </button>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-6 h-screen mt-10">
        <div
          class="flex flex-col pt-5 gap-y-5"
          :style="`border-top: solid 1px ${restaurant.colorSecondary}; border-right: solid 1px ${restaurant.colorSecondary}`"
        >
          <div class="flex justify-center items-center">
            <input
              class="rounded w-3/4 h-8 focus:outline-none  "
              :style="`border: solid 1px ${restaurant.colorSecondary}`"
            />
            <img src="../assets/icons/search-green.svg" class="w-10" />
          </div>
          <div class="flex flex-col gap-y-4 p-5">
            <p>Pizza</p>
            <p>Salads</p>
            <p>Sandwiches</p>
            <p>Extras</p>
            <p>Drinks</p>
          </div>
        </div>
        <div
          :style="`border-top: solid 1px ${restaurant.colorSecondary}; border-right: solid 1px ${restaurant.colorSecondary}`"
          class="col-span-4"
        >
          <div class="flex gap-x-5 m-5">
            <div class="flex items-center">
              <img src="../assets/icons/vegetarian.svg" class="w-10" />
              <p>vegetarian</p>
            </div>
            <div class="flex items-center">
              <img src="../assets/icons/vegan.svg" class="w-10" />
              <p>vegan</p>
            </div>
          </div>
          <div class="m-10">
            <h2 class="text-3xl font-semibold mb-5 ml-5">Pizza</h2>
            <div class="flex flex-col gap-y-5">
            <div class="flex justify-between mx-5">
              <div class="flex flex-col gap-y-2">
                <h3 class="text-xl">Margarita</h3>
                <p class="text-sm  ">Tomatsauce, mozzarella, basilikum</p>
                <p class="text-md">80kr</p>
              </div>
              <img src="../assets/test-images/pizza.jpg" class="w-40 rounded"/>
            </div>
            <div class="flex justify-between mx-5">
              <div class="flex flex-col gap-y-2">
                <h3 class="text-xl">Margarita</h3>
                <p class="text-sm  ">Tomatsauce, mozzarella, basilikum</p>
                <p class="text-md">80kr</p>
              </div>
              <img src="../assets/test-images/pizza.jpg" class="w-40 rounded"/>
            </div>
            <div class="flex justify-between mx-5">
              <div class="flex flex-col gap-y-2">
                <h3 class="text-xl">Margarita</h3>
                <p class="text-sm  ">Tomatsauce, mozzarella, basilikum</p>
                <p class="text-md">80kr</p>
              </div>
              <img src="../assets/test-images/pizza.jpg" class="w-40 rounded"/>
            </div>
            <div class="flex justify-between mx-5">
              <div class="flex flex-col gap-y-2">
                <h3 class="text-xl">Margarita</h3>
                <p class="text-sm  ">Tomatsauce, mozzarella, basilikum</p>
                <p class="text-md">80kr</p>
              </div>
              <img src="../assets/test-images/pizza.jpg" class="w-40 rounded"/>
            </div>
            </div>
          </div>
        </div>
        <div
        class="flex flex-col"
          :style="`border-top: solid 1px ${restaurant.colorSecondary}`"
        >
        <h2 class="text-xl text-center mt-5 font-semibold">Kurv</h2>
        <div class="flex justify-between items-center mt-5 mx-4">
          <h3 class="text-md">1x Margarita</h3>
          <p class="text-sm">80kr</p>
        </div>
        <hr :style="`border-top: 1px solid ${restaurant.colorSecondary}`" class="m-4 mt-8"/>
        <div class="flex flex-col gap-y-2">
        <div class="flex justify-between mx-4">
          <p class="font-medium">Subtotal</p>
          <p>80kr</p>
        </div>
        <div class="flex justify-between mx-4">
          <p class="font-medium">Levering</p>
          <p>{{restaurant.deliveryCost}}kr</p>
        </div>
        <div class="flex justify-between mx-4">
          <p class="font-medium">Samlet</p>
          <p>{{80 + restaurant.deliveryCost}}kr</p>
        </div>
        </div>
        <div class="flex justify-center mt-5">
        <button :style="`background-color: ${restaurant.colorSecondary}`" class="p-1.5 rounded text-white">Gå til kassen</button>
        </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Airtable from "airtable";

const route = useRoute();

const loaded = ref(false);

const restaurant = ref();

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "keyiA3gmotxYIJjLc",
});

var base = Airtable.base("appRiP6vD6l7EmCYB");

// --- Use find method to immediately get correct record but requires id instead of slug
// base('restaurants').find('recCXad6ewDgxkuAf', (err, record) => {
//   if (err) {console.log(err); return}
//   restaurant.value = record.fields
//   loaded.value = true
// })

// --- Use select method with a filter to get specific restaurant from slug
base("restaurants")
  .select({
    filterByFormula: `{slug} = '${route.params.id}'`,
  })
  .eachPage((res) => {
    restaurant.value = res[0].fields;

    loaded.value = true;
  });
</script>
