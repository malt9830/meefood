<template>
  <main :class="textColor">
    <div
      v-if="!loaded"
      class="h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"
    ></div>
    <div v-if="loaded" :style="`background-color: ${restaurant.colorPrimary}`">
      <div
        :style="`background-image: url(${restaurant.splash[0].url}); background-size: cover`"
        class="h-80 sm:h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"
      >
      </div>
      <div class="relative flex flex-col sm:flex-row items-center sm:ml-10">
        <div
          :style="`border: 2px solid ${restaurant.colorSecondary} `"
          class="w-40 h-40 absolute -top-16 sm:top-0 xl:-top-16 sm:left-0 rounded-full bg-white flex justify-center items-center"
        >
        <img :src="restaurant.logo[0].url" class="p-2"/>
        </div>
        <div class="sm:ml-40 flex flex-col items-center sm:items-start pt-24 sm:pt-0">
          <h1 v-if="loaded" class="text-2xl sm:text-3xl font-semibold p-3 sm:p-5">
            {{ restaurant.name }}
          </h1>
          <div class="flex flex-col sm:flex-row sm:flex-wrap flex-start px-5 gap-y-2 sm:gap-x-10 sm:items-start w-screen sm:w-full sm:items-center">
            <div class="flex flex-wrap justify-between sm:justify-start w-full sm:w-fit sm:gap-x-5">
            <p>
              {{
                restaurant.tags[0].charAt(0).toUpperCase() +
                restaurant.tags[0].slice(1)
              }}
            </p>
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
            </div>
            <div class="flex gap-x-2 items-center justify-between sm:justify-start sm:w-fit w-full">
              <div class="flex gap-x-2 items-center ml-1">
              <Smile1
                v-if="restaurant.rating > 8"
                :fill="`${restaurant.colorSecondary}`"
                height="30"
              />
              <Smile2
                v-if="restaurant.rating > 6 && restaurant.rating <= 8"
                :fill="`${restaurant.colorSecondary}`"
                height="30"
              />
              <Smile3
                v-if="restaurant.rating > 4 && restaurant.rating <= 6"
                :fill="`${restaurant.colorSecondary}`"
                height="30"
              />
              <Smile4
                v-if="restaurant.rating <= 4"
                :fill="`${restaurant.colorSecondary}`"
                height="30"
              />
              <p v-if="mobile">Bedømmelse</p>
              </div>
              <p>{{ restaurant.rating }}</p>
            </div>
            <div class="flex gap-x-2 items-center justify-between sm:justify-start sm:w-fit w-full">
              <div class="flex gap-x-2 items-center">
              <Bike :fill="`${restaurant.colorSecondary}`" height="20" />
              <p v-if="mobile">Leveringsgebyr</p>
              </div>
              <p>{{ restaurant.deliveryCost }}kr</p>
            </div>
            <div class="flex gap-x-2 items-center justify-between sm:justify-start sm:w-fit w-full">
              <div class="flex gap-x-2 items-center">
              <Time :fill="`${restaurant.colorSecondary}`" height="20" />
              <p v-if="mobile">Leveringstid</p>
              </div>
              <p>{{ restaurant.deliveryTime }}min</p>
            </div>
            <div class="flex gap-x-2 items-center justify-between sm:justify-start sm:w-fit w-full">
              <div class="flex gap-x-2 items-center ml-1">
              <Bag :fill="`${restaurant.colorSecondary}`" height="30" />
              <p v-if="mobile">Minimum pris</p>
              </div>
              <p class="flex"><span v-if="!mobile">Min. </span> {{ restaurant.minimumPrice }}kr</p>
            </div>
            <div class="flex flex-wrap w-full sm:w-fit sm:gap-x-5 items-center sm:justify-start justify-between">
            <a href="#">www.{{restaurant.slug}}.dk</a>
            <p class="text-center" v-if="day === 'mandag'">
              Åben til {{ restaurant.mandag.slice(8) }}
            </p>
            <p class="sm:mr-10" v-if="day === 'tirsdag'">
              Åben til {{ restaurant.tirsdag.slice(8) }}
            </p>
            <p class="sm:mr-10" v-if="day === 'onsdag'">
              Åben til {{ restaurant.onsdag.slice(8) }}
            </p>
            <p class="sm:mr-10" v-if="day === 'torsdag'">
              Åben til {{ restaurant.torsdag.slice(8) }}
            </p>
            <p class="sm:mr-10" v-if="day === 'fredag'">
              Åben til {{ restaurant.fredag.slice(8) }}
            </p>
            <p class="text-center w-full sm:mr-10" v-if="day === 'lordag'">
              Åben til {{ restaurant.lordag.slice(8) }}
            </p>
            <p class="sm:mr-10" v-if="day === 'sondag'">
              Åben til {{ restaurant.sondag.slice(8) }}
            </p>
            </div>
            <button
              :style="`background-color: ${restaurant.colorSecondary}`"
              class="p-1.5 sm:w-24 text-white rounded hover:opacity-75"
              @click="info = true"
            >
              More info
            </button>
          </div>
        </div>
      </div>
      <div class="sm:grid sm:grid-cols-6 mt-5">
        <div v-if="!mobile"
          class="flex flex-col pt-5 gap-y-5"
          :style="`border-top: solid 1px ${restaurant.colorSecondary}; border-right: solid 1px ${restaurant.colorSecondary}`"
        >
          <div class="sticky top-0">
            <div class="flex items-center ml-5 my-5">
              <input
                v-model="search"
                class="rounded w-5/6 h-8 focus:outline-none p-1 bg-[url('./assets/icons/search-gray.svg')] bg-no-repeat pl-8 md:pl-10 text-gray-500 text-xs md:text-sm"
                placeholder="Søg en ret"
                :style="`border: solid 1px ${restaurant.colorSecondary}`"
              />
            </div>
            <div
              v-for="category in categories"
              :key="category"
              class="flex flex-col px-5 py-3"
            >
              <a :href="`#${category}`" class="capitalize">{{ category }}</a>
            </div>
          </div>
        </div>
        <div
          :style="`border-top: solid 1px ${restaurant.colorSecondary}; border-right: solid 1px ${restaurant.colorSecondary}`"
          class="col-span-6 md:col-span-4"
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
          <div v-if="search === ''">
            <Category
              v-for="category in categories"
              :key="category"
              :category="category"
              :restaurant="restaurant"
              :menu="menu"
              :search="search"
              :searchResult="searchResult"
              :loaded2="loaded2"
            />
          </div>
          <div v-if="search !== ''">
            <SearchResult
              :restaurant="restaurant"
              :menu="menu"
              :search="search"
              :searchResult="searchResult"
            />
          </div>
        </div>
        <div v-if="!mobile"
          class="flex flex-col"
          :style="`border-top: solid 1px ${restaurant.colorSecondary}`"
        >
          <Basket :restaurant="restaurant" :loaded="loaded" />
        </div>
        <Info
          v-if="info === true"
          :info="info"
          :restaurant="restaurant"
          @close-info="info = false"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import Airtable from "airtable";
import { computed, onMounted } from "@vue/runtime-core";

const route = useRoute();

const loaded = ref(false);

const loaded2 = ref(false)

const restaurant = ref();

const menu = ref([]);

const info = ref(false);

const search = ref("");

const day = ref("");

const mobile = ref(false);

const categories = computed(() => {
  const restaurantCategories = [];

  menu.value.forEach((dish) => {
    if (!restaurantCategories.includes(dish.category)) {
      restaurantCategories.push(dish.category);
    }
  });
  return restaurantCategories;
});

const searchResult = computed(() => {
  return menu.value.filter((dish) => {
    return dish.name.toLowerCase().indexOf(search.value.toLowerCase()) != -1;
  });
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

onMounted(() => {
  const d = new Date();
  let number = d.getDay();
  console.log(number);
  if (number === 0) {
    day.value = "sondag";
  } else if (number === 1) {
    day.value = "mandag";
  } else if (number === 2) {
    day.value = "tirsdag";
  } else if (number === 3) {
    day.value = "onsdag";
  } else if (number === 4) {
    day.value = "torsdag";
  } else if (number === 5) {
    day.value = "fredag";
  } else if (number === 6) {
    day.value = "lordag";
  }
  console.log(day.value);
  isMobile();
});

function isMobile() {
  if (screen.width <= 760) {
   mobile.value = true;
   console.log(mobile.value)
  } else {
    mobile.value = false;
    console.log(mobile.value)
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

    loaded.value = true;

    base(`menu-${restaurant.value.slug}`)
      .select()
      .eachPage((res) => {
        res.forEach((dish) => {
          menu.value.push(dish.fields);
        });
      });
      setTimeout(() => {
    loaded2.value = true
  }, 2000)
  });
</script>
