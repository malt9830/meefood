<template>
  <main :class="textColor">
    <div
      v-if="!loaded"
      class="h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"
    ></div>
    <div v-if="loaded" :style="`background-color: ${restaurant.colorPrimary}`">
      <div
        :style="`background-image: url(${restaurant.splash[0].url})`"
        class="h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"
      >
      </div>
      <div class="relative flex flex-col sm:flex-row items-center sm:ml-10">
       <div
          :style="`border: 2px solid ${restaurant.colorSecondary}; background-image: url(${restaurant.logo[0].url}); background-size: contain; background-repeat: no-repeat`"
          class="w-40 h-40 sm:absolute top-0  md:-top-16 left-0 rounded-full bg-white flex justify-center items-center"
        >
        </div>
        <div class="sm:ml-40 flex flex-col items-center sm:items-start">
          <h1 v-if="loaded" class="text-3xl font-semibold sm:p-5">
            {{ restaurant.name }}
          </h1>
        </div>
      </div>
    </div>
    <div :style="`background-color: ${restaurant.colorPrimary}`" class="grid grid-cols-2">
      <div :style="border"></div>
      <div :style="`border: 2px solid ${restaurant.colorSecondary}`" class="flex flex-col gap-y-5 p-7 w-5/6 my-10 rounded-2xl">
        <h2 class="text-center font-semibold text-2xl">Din bestilling</h2>
      <div
        v-for="dish in store.basket"
        :key="dish.name"
        class="flex flex-col"
      >
        <div class="flex justify-between items-center">
          <h3 class="text-md">{{ dish.amount }}x {{ dish.name }}</h3>
          <p class="text-sm">{{ dish.amount * dish.price }}kr</p>
        </div>
        <div class="flex justify-start items-center gap-x-5">
          <p class="text-xs" v-if="dish.options">{{ dish.picked }}</p>
          <p v-if="!dish.comment && !dish.options"></p>
          <p class="text-xs" v-if="dish.comment">"{{ dish.comment }}"</p>
        </div>
      </div>
      <hr :style="`border-color: ${restaurant.colorSecondary}`"/>
      <div class="flex flex-col gap-y-4">
        <div class="flex justify-between">
      <p class="font-semibold">Subtotal</p>
      <p>{{ store.totalPrice }}kr</p>
    </div>
    <div class="flex justify-between">
      <p class="font-semibold">Levering</p>
      <p>{{ restaurant.deliveryCost }}kr</p>
    </div>
    <div class="flex justify-between">
      <p class="font-semibold">Samlet</p>
      <p>{{ store.totalPrice + restaurant.deliveryCost }}kr</p>
    </div>
      </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Airtable from "airtable";
import { useBasketStore } from "/src/stores/basketStore";

const store = useBasketStore();

const route = useRoute();

const loaded = ref(false);

const loaded2 = ref(false);

const restaurant = ref();

const menu = ref([]);

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

    loaded.value = true;

    base(`menu-${restaurant.value.slug}`)
      .select()
      .eachPage((res) => {
        res.forEach((dish) => {
          menu.value.push(dish.fields);
        });
      });
    setTimeout(() => {
      loaded2.value = true;
    }, 2000);
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
