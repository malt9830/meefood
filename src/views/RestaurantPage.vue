<template>
  <main class="">
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
            <p>
              {{
                restaurant.tags[0].charAt(0).toUpperCase() +
                restaurant.tags[0].slice(1)
              }}
            </p>
            <div class="flex gap-x-2 items-center">
              <Smile1 :fill="`${restaurant.colorSecondary}`" height="30" />
              <p>{{ restaurant.rating }}</p>
            </div>
            <div class="flex gap-x-2 items-center">
              <Bike :fill="`${restaurant.colorSecondary}`" height="20" />
              <p>{{ restaurant.deliveryCost }}kr</p>
            </div>
            <div class="flex gap-x-2 items-center">
              <Time :fill="`${restaurant.colorSecondary}`" height="20" />
              <p>{{ restaurant.deliveryTime }}min</p>
            </div>
            <div class="flex gap-x-2 items-center">
              <Bag :fill="`${restaurant.colorSecondary}`" height="30" />
              <p>Min. {{ restaurant.minimumPrice }}kr</p>
            </div>
            <div class="flex">
              <Dollar :fill="`${restaurant.colorSecondary}`" height="20" />
              <Dollar
                v-if="restaurant.priceRange > 1"
                :fill="`${restaurant.colorSecondary}`"
                height="20"
              />
              <Dollar
                v-if="restaurant.priceRange > 2"
                :fill="`${restaurant.colorSecondary}`"
                height="20"
              />
              <Dollar
                v-if="restaurant.priceRange > 3"
                :fill="`${restaurant.colorSecondary}`"
                height="20"
              />
            </div>
            <p>www.restaurant.dk</p>
            <button
              :style="`background-color: ${restaurant.colorSecondary}`"
              class="p-1.5 text-white rounded hover:opacity-75"
              @click="info = true"
            >
              More info
            </button>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-6 mt-10">
        <div
          class="flex flex-col pt-5 gap-y-5"
          :style="`border-top: solid 1px ${restaurant.colorSecondary}; border-right: solid 1px ${restaurant.colorSecondary}`"
        >
          <div class="sticky top-0">
            <div class="flex justify-center items-center ml-2 mt-2">
              <input
                class="rounded w-3/4 h-8 focus:outline-none p-1"
                :style="`border: solid 1px ${restaurant.colorSecondary}`"
              />
              <Search :fill="`${restaurant.colorSecondary}`" height="40" />
            </div>
            <div v-for="category in categories" :key="category" class="flex flex-col px-5 py-3">
              <a :href="`#${category}`" class="capitalize">{{category}}</a>
            </div>
          </div>
        </div>
        <div
          :style="`border-top: solid 1px ${restaurant.colorSecondary}; border-right: solid 1px ${restaurant.colorSecondary}`"
          class="col-span-4"
        >
          <div class="flex gap-x-5 m-5">
            <div class="flex items-center">
              <Vegetarian :fill="`${restaurant.colorSecondary}`" height="40" />
              <p>vegetarian</p>
            </div>
            <div class="flex items-center">
              <Vegan :fill="`${restaurant.colorSecondary}`" height="40" />
              <p>vegan</p>
            </div>
          </div>
         <Category v-for="category in categories" :key="category" :category="category" :restaurant="restaurant" :menu="menu"/>
        </div>
        <div
          class="flex flex-col"
          :style="`border-top: solid 1px ${restaurant.colorSecondary}`"
        >
          <Basket :restaurant="restaurant"/>
        </div>
         <Info v-if="info === true" :info="info" :restaurant="restaurant" @close-info="info = false"/>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import Airtable from "airtable";

const route = useRoute();

const loaded = ref(false);

const restaurant = ref();

const menu = ref([]);

const info = ref(false);


const categories = computed(() => {
  const restaurantCategories = []

  menu.value.forEach(dish => {
    if (!restaurantCategories.includes(dish.category)) {
    restaurantCategories.push(dish.category)
    }
  })
  return restaurantCategories
})

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
  });

base("menu-marios-bistro")
  .select()
  .eachPage((res) => {
    res.forEach((dish) => {
      menu.value.push(dish.fields);
    });
  });
</script>
