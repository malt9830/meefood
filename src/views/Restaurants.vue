<template>
  <main class="max-w-7xl mx-auto pt-24 px-2">
    <h2 class="text-2xl font-semibold">Restauranter</h2>
    <div class="grid gap-4 pt-4 sm:grid-cols-2 md:grid-cols-3">
        <RouterLink class="block cursor-pointer rounded-2xl group transform hover:scale-[103%] duration-200" :to="`/restaurant/${rest.slug}`" v-for="rest in restaurants" :key="rest.slug">
          <div class="grid content-center w-full h-36 rounded-t-2xl overflow-hidden">
            <img class="w-full h-auto transform scale-105 group-hover:scale-110 duration-200" :src="rest.splash[0].url">
          </div>
          <div class="px-4 py-2">
            <h1>{{ rest.name }} - {{ rest.slogan }}</h1>
            <hr class="my-1">
            <p class="flex flex-wrap gap-4 text-sm">
              <span class="capitalize">{{ rest.tags[0] }}</span>
              <span class="flex gap-1 items-center">
                <img class="h-4" src="@/src/assets/icons/smile1.svg">
                <span>{{ rest.rating }}</span>
              </span>
              <span class="flex gap-1 items-center">
                <img class="h-4" src="@/src/assets/icons/bike.svg">
                <span>{{ rest.deliveryCost }} kr.</span>
              </span>
              <span class="flex gap-1 items-center">
                <img class="h-4" src="@/src/assets/icons/bag.svg">
                <span>Min. {{ rest.minimumPrice }} kr.</span>
              </span>
            </p>
          </div>
        </RouterLink>
    </div>
  </main>
</template>

<script setup>
import Airtable from 'airtable'

const restaurants = ref([])

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyiA3gmotxYIJjLc'
})

var base = Airtable.base('appRiP6vD6l7EmCYB')

base('restaurants').select().eachPage(res => {
  res.forEach(rest => {
    restaurants.value.push(rest.fields)
    console.log(restaurants.value)
  })
})
</script>

<style scoped>
a {
  box-shadow: 0px 1px 5px #707070;
}
</style>