<template>
  <main :class="`text-${textColor}`">
    <SplashPlaceholder v-if="showSplashPlaceholder" :tablet="tablet"/>
    <div v-if="restaurantLoaded" :style="`background-color: ${restaurant.colorPrimary}`" class="pb-4">
      <div
        :style="`background-image: url(${restaurant.splash[0].url}); background-size: cover`"
        class="h-80 sm:h-[50vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover"
      >
      </div>
      <div class="relative flex flex-col max-w-7xl mx-auto sm:flex-row items-center sm:l-10">
        <div
          :style="`border: 2px solid ${restaurant.colorSecondary} `"
          class="w-40 h-40 absolute -top-16 sm:mt-1 sm:top-0 lg:-top-16 sm:left-0 sm:m-4 rounded-full bg-white flex justify-center items-center"
        >
          <img :src="restaurant.logo[0].url" class="p-2"/>
        </div>
        <div class="sm:ml-48 flex flex-col w-full items-center sm:items-start pt-24 sm:pt-0">
          <h1 v-if="restaurantLoaded" class="text-2xl sm:text-3xl font-semibold p-3 sm:p-5">
            {{ restaurant.name }}
          </h1>
          <div class="flex flex-col sm:flex-row sm:flex-wrap flex-start place-items-center px-5 gap-y-2 sm:gap-x-6 sm:items-start w-full">
            <div class="flex flex-wrap justify-between place-self-center sm:justify-start w-full sm:w-fit sm:gap-x-5">
            <p>
              {{
                restaurant.tags[0].charAt(0).toUpperCase() +
                restaurant.tags[0].slice(1)
              }}
            </p>
            <div class="flex gap-1 items-center">
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
            <div class="flex gap-x-2 place-self-center items-center justify-between sm:justify-start sm:w-fit w-full">
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
            <div class="flex gap-x-2 place-self-center items-center justify-between sm:justify-start sm:w-fit w-full">
              <div class="flex gap-x-2 items-center">
              <Bike :fill="`${restaurant.colorSecondary}`" height="20" />
              <p v-if="mobile">Leveringsgebyr</p>
              </div>
              <p>{{ restaurant.deliveryCost }} kr.</p>
            </div>
            <div class="flex gap-x-2 place-self-center items-center justify-between sm:justify-start sm:w-fit w-full">
              <div class="flex gap-x-2 items-center">
              <Time :fill="`${restaurant.colorSecondary}`" height="20" />
              <p v-if="mobile">Leveringstid</p>
              </div>
              <p>{{ restaurant.deliveryTime }} min</p>
            </div>
            <div class="flex gap-x-2 place-self-center items-center justify-between sm:justify-start sm:w-fit w-full">
              <div class="flex gap-x-2 items-center ml-1">
              <Bag :fill="`${restaurant.colorSecondary}`" height="30" />
              <p v-if="mobile">Minimum pris</p>
              </div>
              <p class="flex"><span v-if="!mobile">Min. </span> {{ restaurant.minimumPrice }} kr.</p>
            </div>
            <div class="flex flex-wrap w-full place-self-center sm:w-fit sm:gap-x-10 items-center sm:justify-start justify-between">
            <a href="#">www.{{restaurant.slug}}.dk</a>
            <p class="text-center">
              Åben til {{ closingTime }}
            </p>
            </div>
            <button
              :style="`background-color: ${restaurant.colorSecondary}`"
              class="py-2 px-4 mt-2 sm:mt-0 text-white whitespace-nowrap rounded duration-200 hover:opacity-75"
              @click="showInfo = true"
            >
              Mere info
            </button>
          </div>
        </div>
      </div>
      <div class="flex mt-5 max-w-7xl mx-auto">
        <div v-if="!tablet"
          class="flex flex-col pt-5 gap-y-5 max-w-[12rem]"
          :style="`border-top: solid 1px ${restaurant.colorSecondary}; border-right: solid 1px ${restaurant.colorSecondary}`"
        >
          <div class="sticky top-0 pt-5">
            <div
                class="flex items-center mx-4 bg-white rounded overflow-hidden"
                :style="`border: solid 1px ${restaurant.colorSecondary}`">
              <Search class="p-1 fill-gray-500"/>
              <input
                v-model="search"
                class="w-5/6 h-8 outline-none focus:outline-none p-1 text-gray-500 text-xs md:text-sm"
                placeholder="Søg en ret"
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
          :style="`border-top: solid 1px ${restaurant.colorSecondary}; border-right-color: ${restaurant.colorSecondary}`"
          class="grow w-full border-r-0 md:border-r"
        >

          <div v-if="mobile || tablet" :style="`background-color:${restaurant.colorPrimary}`" class="sticky -top-1 w-full flex p-4 pt-3 pb-2 overflow-auto whitespace-nowrap text-white">
            <button v-for="category in categories" :key="category" :style="`background-color:${restaurant.colorSecondary}`" class="mr-2 px-2 py-1 rounded-full duration-200 transform active:scale-110">
              <a :href="`#${category}`" class="capitalize">{{ category }}</a>
            </button>
          </div>

          <div class="flex gap-x-5 m-4">
            <div class="flex items-center">
              <Vegetarian :fill="`${restaurant.colorSecondary}`" height="40" />
              <p>vegetar</p>
            </div>
            <div class="flex items-center">
              <Vegan :fill="`${restaurant.colorSecondary}`" height="40" />
              <p>vegansk</p>
            </div>
          </div>

          <div>
            <Category
              v-for="category in categories"
              :key="category"
              :category="category"
              :restaurant="restaurant"
              :filteredMenu="filteredMenu"
              :menuLoaded="menuLoaded"
              :textColor="textColor"
              :primaryColor="restaurant.colorPrimary"
            />
          </div>
        </div>
        <div v-if="!tablet"
          class="flex flex-col w-full max-w-[15rem]"
          :style="`border-top: solid 1px ${restaurant.colorSecondary}`"
        >
          <Basket :restaurant="restaurant" :restaurantLoaded="restaurantLoaded" />
        </div>
        <Teleport to="body">
          <Transition name="slide" :duration="300">
              <InfoModal
                v-if="showInfo"
                :restaurant="restaurant"
                @closeInfo="showInfo = false"
              />
          </Transition>
        </Teleport>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useBasketStore } from '../stores/basketStore'
import { useSearchStore } from '../stores/searchStore'
import Airtable from "airtable";

const basketStore = useBasketStore()
const searchStore = useSearchStore()
const route = useRoute();

const showSplashPlaceholder = ref(true)
const restaurantLoaded = ref(false)
const menuLoaded = ref(false)

const restaurant = ref();
const menu = ref([]);

const showInfo = ref(false);

const search = ref("");

const day = ref("");

const tablet = ref(false);
const mobile = ref(false);

const closingTime = computed(() => {
  const date = new Date();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  
  return restaurant.value[days[date.getDay()]].slice(8)
})

const filteredMenu = computed(() => {
  return menu.value.filter((dish) => dish.name.toLowerCase().includes(search.value.toLowerCase()));
});

const categories = computed(() => {
  const categories = [];

  filteredMenu.value.forEach((dish) => {
    if (!categories.includes(dish.category)) {
      categories.push(dish.category);
    }
  });
  return categories;
});

const textColor = computed(() => {
  //Parse integers from hexadecimal to decimal
  const r = parseInt(restaurant.value?.colorPrimary.substring(1, 3), 16);
  const g = parseInt(restaurant.value?.colorPrimary.substring(3, 5), 16);
  const b = parseInt(restaurant.value?.colorPrimary.substring(5, 7), 16);

  // Calculate luminance, i.e. measurement of brightness
  const luminance = Math.round(r * 0.2126 + g * 0.7152 + b * 0.0722);

  // Return Tailwind text class of black or white based on brightness
  return luminance > 150 ? "black" : "white";
});

// Prevent scrolling body when a modal is open
watch(showInfo, (modal) => {
  document.querySelector("body").style.overflow = (modal ? 'hidden' : 'auto')
  document.querySelector("main > div").style.paddingRight = (modal ? '1rem' : '0')
  document.querySelector("main > div > div:first-of-type").style.width = (modal ? 'calc(100% + 1rem)' : '100%')
  document.querySelector("header > div").style.paddingRight = (modal ? '1rem' : '0')
})

watch(restaurantLoaded, () => {
  // Load basket when restaurant is restaurantLoaded
  basketStore.$patch((state) => {
    state.basket = (JSON.parse(localStorage.getItem(`basket-${restaurant.value.slug}`)) || [])
  })

  // Set minimum price
  basketStore.$patch((state) => {
    state.minimumPrice = restaurant.value.minimumPrice
  })
})

// Save in localStorage whenever basket updates in correct restaurant
basketStore.$subscribe((mutation, state) => {
  localStorage.setItem(`basket-${restaurant.value.slug}`, JSON.stringify(state.basket))
})  

// Update search value when changed in mobile menu
searchStore.$subscribe(() => search.value = searchStore.dish)

onMounted(() => {
  // Clear search on mounted
  searchStore.$reset()

  tablet.value = (window.innerWidth < 768 ? true : false);
  window.addEventListener('resize', () => tablet.value = (window.innerWidth < 768 ? true : false));
  mobile.value = (window.innerWidth < 640 ? true : false);
  window.addEventListener('resize', () => mobile.value = (window.innerWidth < 640 ? true : false));
});

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

    restaurantLoaded.value = true;
    setTimeout(() => {
      showSplashPlaceholder.value = false
    }, (Math.floor(Math.random() * 1000 + 500)))

    base(`menu-${restaurant.value.slug}`)
      .select({
        view: "Grid view"
      })
      .eachPage((res) => {
        res.forEach((dish) => {
          menu.value.push(dish.fields);
        });
      });
      setTimeout(() => {
        menuLoaded.value = true
      }, (Math.floor(Math.random() * 1500 + 1000)))
  });
</script>
