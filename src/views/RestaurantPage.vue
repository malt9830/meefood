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
        >
      </div>
      <div class="flex items-center ml-10">
        <div
          :style="`border: 2px solid ${restaurant.colorSecondary}`"
          class="w-40 -mt-8 h-40 rounded-full bg-white flex justify-center items-center"
        >
          <img :src="restaurant.logo[0].url" class="p-8" />
        </div>
        <div class="flex flex-col">
          <h1 v-if="loaded" class="text-3xl font-semibold p-5">
            {{ restaurant.name }}
          </h1>
          <div class="flex justify-between px-5 gap-x-10 items-center">
            <p>
              {{
                restaurant.tags[0].charAt(0).toUpperCase() +
                restaurant.tags[0].slice(1)
              }}
            </p>
            <div class="flex gap-x-2 items-center">
              <Smile1 v-if="restaurant.rating > 8" :fill="`${restaurant.colorSecondary}`" height="30" />
              <Smile2 v-if="restaurant.rating > 6 && restaurant.rating <= 8" :fill="`${restaurant.colorSecondary}`" height="30" />
              <Smile3 v-if="restaurant.rating > 4 && restaurant.rating <= 6" :fill="`${restaurant.colorSecondary}`" height="30" />
              <Smile4 v-if="restaurant.rating <= 4" :fill="`${restaurant.colorSecondary}`" height="30" />
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
      <div class="grid grid-cols-6 mt-5">
        <div
          class="flex flex-col pt-5 gap-y-5"
          :style="`border-top: solid 1px ${restaurant.colorSecondary}; border-right: solid 1px ${restaurant.colorSecondary}`"
        >
          <div class="sticky top-0">
            <div class="flex items-center ml-5 my-5">
              <input v-model="search"
                class="rounded w-5/6 h-8 focus:outline-none p-1 bg-[url('./assets/icons/search-gray.svg')] bg-no-repeat pl-10 text-gray-500" placeholder="Søg en ret"
                :style="`border: solid 1px ${restaurant.colorSecondary}`"
              />
              
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
          <div v-if='search === ""'>
         <Category v-for="category in categories" :key="category" :category="category" :restaurant="restaurant" :menu="menu" :search="search" :searchResult="searchResult"/>
          </div>
          <div v-if='search !== ""'>
         <SearchResult :restaurant="restaurant" :menu="menu" :search="search" :searchResult="searchResult"/>
          </div>
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
import Airtable from "airtable";
import { computed } from "@vue/runtime-core";

const route = useRoute();

const loaded = ref(false);

const restaurant = ref();

const menu = ref([]);

const info = ref(false);

const search = ref("");



const categories = computed(() => {
  const restaurantCategories = []

  menu.value.forEach(dish => {
    if (!restaurantCategories.includes(dish.category)) {
    restaurantCategories.push(dish.category)
    }
  })
  return restaurantCategories
})

const searchResult = computed(() => {
  return menu.value.filter((dish) => {
    return (
      dish.name
        .toLowerCase()
        .indexOf(search.value.toLowerCase()) != -1
    );
  });
});

const textColor = computed(() => {
  //Parse integers from hexadecimal to decimal
  const r = parseInt(restaurant.value?.colorPrimary.substring(1, 3), 16);
  const g = parseInt(restaurant.value?.colorPrimary.substring(3, 5), 16);
  const b = parseInt(restaurant.value?.colorPrimary.substring(5, 7), 16);

  // Calculate luminance, i.e. measurement of brightness
  const luminance = Math.round(r * 0.2126 + g * 0.7152 + b * 0.0722)

  // Return Tailwind text class of black or white based on brightness
  return luminance > 150 ? 'text-black' : 'text-white'
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
