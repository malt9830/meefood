<template>
  <main class="max-w-7xl mx-auto pt-24 px-4">
    <div class="flex flex-row justify-between">
      <h2 class="text-3xl font-semibold">Restauranter</h2>
      <img @click="showFilter = !showFilter" class="w-9 cursor-pointer transform hover:scale-110 duration-200" src="/src/assets/icons/filter.svg">
    </div>
    <div v-if="loaded" class="grid gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3">
      <RestaurantCard v-for="rest in filteredRestaurants" :key="rest.slug" :restaurant="rest"/>
    </div>
    <div v-if="!loaded" class="grid gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3">
      <RestaurantCardPlaceholder v-for="n in 9" :key="n"/>
    </div>
    <FilterModal :showFilter="showFilter" @closeFilter="showFilter = false"/>
  </main>
</template>

<script setup>
import { useFilterStore } from '/src/stores/filterStore';
import Airtable from 'airtable'

const store = useFilterStore()

const activeSorting = computed(() => {
  if (store.activeSorting === "Mest populære") return 'rating'
  if (store.activeSorting === "Pris") return 'priceRange'
  if (store.activeSorting === "Leveringspris") return 'deliveryCost'
  if (store.activeSorting === "Leveringstid") return 'deliveryTime'
  if (store.activeSorting === "Minimumspris") return 'minimumPrice'
})

const showFilter = ref(false)

const loaded = ref(false)
const restaurants = ref([])

const filteredRestaurants = computed(() => {
  const filteredRestaurants = restaurants.value.filter(rest => {
    // Check if restaurant tags matches any filter tags or if no filters apply
    if(rest.tags.some(el => store.activeFilters.includes(el)) || store.activeFilters.length === 0) return rest
  })

  filteredRestaurants.sort((a, b) => {
    return (a[store.sortingValue] - b[store.sortingValue]) * store.sortingDirection
  })

  return filteredRestaurants
})

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyiA3gmotxYIJjLc'
})

var base = Airtable.base('appRiP6vD6l7EmCYB')

base('restaurants').select({}).eachPage(res => {
  res.forEach(rest => restaurants.value.push(rest.fields))

  setTimeout(() => {
    loaded.value = true
  }, 2000)
})
</script>