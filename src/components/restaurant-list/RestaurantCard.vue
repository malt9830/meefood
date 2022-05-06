<template>
  <RouterLink class="block cursor-pointer rounded-2xl group transform hover:scale-[103%] duration-200" :to="`/restaurant/${restaurant.slug}`">
    <div class="relative flex flex-col w-full h-40 rounded-t-2xl">
      <div class="absolute flex h-full w-full rounded-t-2xl overflow-hidden">
        <img class="absolute w-full h-auto place-self-center object-cover -z-10 transform scale-110 group-hover:scale-100 duration-200" :src="restaurant.splash[0].url">
        <div class="h-[120%] w-full bg-gradient-to-t from-black via-transparent" />
      </div>
      <div class="flex flex-row mt-auto pl-2 transform translate-y-6">
        <div class="grid w-20 aspect-square bg-white border border-emerald-500 rounded-full overflow-hidden">
          <img class="w-full place-self-center" :src="restaurant.logo[0].url">
        </div>
        <p class="text-2xl font-semibold text-white px-2 pb-2 self-center">{{ restaurant.name }}</p>
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
          <img class="h-6" src="@/src/assets/icons/smile1.svg">
          <span>{{ restaurant.rating }}</span>
        </span>
        <span class="flex gap-1 items-center">
          <img class="h-6" src="@/src/assets/icons/bike.svg">
          <span>{{ restaurant.deliveryCost }} kr.</span>
        </span>
        <span class="flex gap-1 items-center">
          <img class="h-6" src="@/src/assets/icons/bag.svg">
          <span>Min. {{ restaurant.minimumPrice }} kr.</span>
        </span>
        <PriceRange :priceRange="restaurant.priceRange"/>
      </p>
    </div>
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  restaurant: Object
})
</script>

<style scoped>
a {
  box-shadow: 0px 1px 5px #707070;
}
</style>