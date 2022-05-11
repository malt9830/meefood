<template>
  <section class="max-w-7xl mx-auto py-10 px-4">
    <h2 class="text-3xl font-semibold">Mest populære</h2>
    <div v-if="loaded" class="grid gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3">
      <RestaurantCard v-for="rest in restaurants" :key="rest.slug" :restaurant="rest"/>
    </div>
    <div class="flex justify-center mt-8">
      <RouterLink to="/restaurants" class="inline-block text-center bg-emerald-500 text-white text-xl hover:bg-emerald-600 py-2 px-4 rounded-xl duration-200">Se alle restauranter</RouterLink>
    </div>
  </section>
</template>

<script setup>
import Airtable from 'airtable'

const loaded = ref(false)
const restaurants = ref([])

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyiA3gmotxYIJjLc'
})

var base = Airtable.base('appRiP6vD6l7EmCYB')

base('restaurants').select({
  maxRecords: 3,
  sort: [{field: "rating", direction: "desc"}]
}).eachPage(res => {
  res.forEach(rest => restaurants.value.push(rest.fields))

  loaded.value = true
})
</script>