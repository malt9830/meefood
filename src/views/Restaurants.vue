<template>
  <main class="max-w-7xl mx-auto pt-24 pb-8 px-4">
    <div class="flex flex-row justify-between">
      <h2 class="text-3xl text-gray-800 font-semibold">Restauranter</h2>
      <FilterCircle @click="showFilter = !showFilter" class="hidden md:block w-8 h-auto cursor-pointer transform hover:scale-110 duration-200"/>
    </div>
    <div v-if="loaded && filteredRestaurants.length === 0" class="mt-2">
      <p>Der kunne ikke findes nogen restauranter for '{{ filterStore.activeSearch }}'.</p>
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

const filterStore = useFilterStore()

const activeSorting = computed(() => {
  if (filterStore.activeSorting === "Mest populære") return 'rating'
  if (filterStore.activeSorting === "Pris") return 'priceRange'
  if (filterStore.activeSorting === "Leveringspris") return 'deliveryCost'
  if (filterStore.activeSorting === "Leveringstid") return 'deliveryTime'
  if (filterStore.activeSorting === "Minimumspris") return 'minimumPrice'
})

const showFilter = ref(false)

const loaded = ref(false)
const restaurants = ref([])

const filteredRestaurants = computed(() => {
  const filteredRestaurants = restaurants.value.filter(rest => {
    // Check if restaurant tags matches any filter tags or if no filters apply
    if(rest.tags.some(el => filterStore.activeFilters.includes(el)) || filterStore.activeFilters.length === 0 && rest.name.toLowerCase().includes(filterStore.activeSearch.toLowerCase())) return rest
  })

  filteredRestaurants.sort((a, b) => {
    return (a[filterStore.sortingValue] - b[filterStore.sortingValue]) * filterStore.sortingDirection
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
  }, (Math.floor(Math.random() * 1500 + 500)))
})
</script>