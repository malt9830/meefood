<template>
  <main>
    <div v-if="!loaded" class="h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"></div>
    <div v-if="loaded" :style="`background-image: url(${ restaurant.splash[0].url })`" class="h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"></div>
    <h1 v-if="loaded" class="text-3xl font-semibold p-12">{{ restaurant.name }}</h1>
  </main>
</template>

<script setup>
import Airtable from 'airtable'

const route = useRoute()

const loaded = ref(false)

const restaurant = ref()

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyiA3gmotxYIJjLc'
})

var base = Airtable.base('appRiP6vD6l7EmCYB')

// --- Use find method to immediately get correct record but requires id instead of slug
// base('restaurants').find('recCXad6ewDgxkuAf', (err, record) => {
//   if (err) {console.log(err); return}
//   restaurant.value = record.fields
//   loaded.value = true
// })

// --- Use select method with a filter to get specific restaurant from slug
base('restaurants').select({
  filterByFormula: `{slug} = '${route.params.id}'`
}).eachPage(res => {
  restaurant.value = res[0].fields

  console.log(res)

  loaded.value = true
})
</script>