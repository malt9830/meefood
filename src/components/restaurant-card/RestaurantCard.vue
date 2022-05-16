<template>
  <RouterLink class="block cursor-pointer rounded-2xl shadow-card group transform hover:scale-[103%] duration-200" :to="`/restaurant/${restaurant.slug}`">
    <div class="relative flex flex-col w-full h-40 rounded-t-2xl">
      <div class="absolute flex h-full w-full rounded-t-2xl overflow-hidden">
        <img class="absolute w-full h-auto place-self-center object-cover -z-10 transform scale-110 group-hover:scale-100 duration-200" :src="restaurant.splash[0].url">
        <div class="h-[120%] w-full bg-gradient-to-t from-black via-transparent" />
      </div>
      <div class="flex flex-row mt-auto px-2 transform translate-y-6">
        <div class="grid w-20 aspect-square bg-white border border-emerald-500 rounded-full overflow-hidden">
          <img class="w-full min-w-full place-self-center p-2" :src="restaurant.logo[0].url">
        </div>
        <p class="text-2xl font-semibold text-white whitespace-nowrap px-2 pb-2 self-center">{{ restaurant.name }}</p>
        <div class="flex bg-white border border-emerald-500 h-10 p-1 pl-3 ml-auto rounded-full transform translate-y-9">
          <div class="mr-2 place-self-center text-emerald-500 text-center">
            <p class="text-sm leading-none font-bold">{{ restaurant.deliveryTime }}</p>
            <p class="text-xs leading-none font-semibold">min</p>
          </div>
          <img class="h-full w-auto" src="/src/assets/icons/time-alternative.svg">
        </div>
      </div>
    </div>
    <div class="px-4 pb-2 pt-1">
      <p class="text-sm pl-20">{{ restaurant.slogan }}</p>
      <hr class="my-1">
      <p class="flex flex-wrap gap-2 text-sm">
        <span class="flex items-center">
          <span class="capitalize">{{ restaurant.tags[0] }}</span>
        </span>
        <span class="flex gap-1 items-center">
          <Smile1 v-if="restaurant.rating > 8" class="fill-emerald-500 h-6 w-auto"/>
          <Smile2 v-if="restaurant.rating > 6 && restaurant.rating <= 8" class="fill-emerald-500 h-6 w-auto"/>
          <Smile3 v-if="restaurant.rating > 4 && restaurant.rating <= 6" class="fill-emerald-500 h-6 w-auto"/>
          <Smile4 v-if="restaurant.rating <= 4" class="fill-emerald-500 h-6 w-auto"/>
          <span>{{ restaurant.rating }}</span>
        </span>
        <span class="flex gap-1 items-center">
          <Bike class="fill-emerald-500 h-6 w-auto"/>
          <span>{{ restaurant.deliveryCost }} kr.</span>
        </span>
        <span class="flex gap-1 items-center">
          <Bag class="fill-emerald-500 h-6 w-auto"/>
          <span>Min. {{ restaurant.minimumPrice }} kr.</span>
        </span>
        <span class="flex gap-1 items-center">
          <Dollar v-for="n in parseInt(restaurant.priceRange)" :key="n" class="fill-emerald-500 h-6 w-auto"/>
        </span>   
      </p>
    </div>
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  restaurant: Object
})
</script>