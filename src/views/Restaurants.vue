<template>
  <main class="max-w-7xl mx-auto pt-24 px-4">
    <div class="flex flex-row justify-between">
      <h2 class="text-3xl font-semibold">Restauranter</h2>
      <img @click="showFilter = !showFilter" class="w-9 cursor-pointer transform hover:scale-105 duration-200" src="@/src/assets/icons/filter.svg">
    </div>
    <div v-if="loaded" class="grid gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3">
      <RestaurantCard v-for="rest in restaurants" :key="rest.slug" :restaurant="rest"/>
    </div>
    <FilterModal v-if="showFilter" @closeFilter="showFilter = false"/>
  </main>
</template>

<script setup>
import Airtable from 'airtable'

const showFilter = ref(false)

const restaurants = ref([])

const loaded = ref(false)

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyiA3gmotxYIJjLc'
})

var base = Airtable.base('appRiP6vD6l7EmCYB')

base('restaurants').select({
  // Only show the first 5 while in development to avoid empty restaurants
  maxRecords: 6,
  view: "Grid view"
}).eachPage(res => {
  res.forEach(rest => restaurants.value.push(rest.fields))

  loaded.value = true
})
</script>