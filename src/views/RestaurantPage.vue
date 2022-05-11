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
            <div class="flex flex-col gap-y-4 p-5">
              <a href="#pizza">Pizza</a>
              <a href="#pasta">Pasta</a>
              <p>Sandwiches</p>
              <p>Extras</p>
              <p>Drinks</p>
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
          <div class="m-10">
            <h2 id="pizza" class="text-3xl font-semibold mb-5 ml-5">Pizza</h2>
            <div class="flex flex-col gap-y-5">
              <SingleItem v-for="dish in menu" :key="dish.name" :dish="dish" :restaurant="restaurant" />
            </div>
          </div>
          <div class="m-10">
            <h2 id="pasta" class="text-3xl font-semibold mb-5 ml-5">Pasta</h2>
            <div class="flex flex-col gap-y-5">
              <div
                v-for="dish in menu"
                :key="dish.name"
              >
                <div
                  v-if="dish.category === `pasta`"
                  class="flex justify-between mx-5"
                >
                  <div class="flex flex-col gap-y-2">
                    <div class="flex gap-x-1">
                      <h3 class="text-xl font-medium">{{ dish.name }}</h3>
                      <Vegetarian
                        class="h-8"
                        :style="`fill: ${restaurant.colorSecondary}`"
                        v-if="dish.vegetarian === true"
                      />
                      <Vegan
                        class="h-8"
                        :style="`fill: ${restaurant.colorSecondary}`"
                        v-if="dish.vegan === true"
                      />
                    </div>
                    <p class="text-sm font-light">{{ dish.description }}</p>
                    <p class="text-md">{{ dish.price }}kr</p>
                  </div>
                  <img :src="dish.image[0].url" class="w-40 h-28 rounded" />
                </div>
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
          <hr
            :style="`border-top: 1px solid ${restaurant.colorSecondary}`"
            class="m-4 mt-8"
          />
          <div class="flex flex-col gap-y-2">
            <div class="flex justify-between mx-4">
              <p class="font-medium">Subtotal</p>
              <p>80kr</p>
            </div>
            <div class="flex justify-between mx-4">
              <p class="font-medium">Levering</p>
              <p>{{ restaurant.deliveryCost }}kr</p>
            </div>
            <div class="flex justify-between mx-4">
              <p class="font-medium">Samlet</p>
              <p>{{ 80 + restaurant.deliveryCost }}kr</p>
            </div>
          </div>
          <div class="flex justify-center mt-5">
            <button
              :style="`background-color: ${restaurant.colorSecondary}`"
              class="p-1.5 rounded text-white hover:opacity-75"
            >
              Gå til kassen
            </button>
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
  });

base("menu-marios-bistro")
  .select()
  .eachPage((res) => {
    res.forEach((dish) => {
      menu.value.push(dish.fields);
      console.log(menu.value);
    });
  });
</script>
