<template>
  <main class="max-w-7xl mx-auto pt-24 px-2">
    <h2 class="text-2xl font-semibold">Restauranter</h2>
    <div class="grid gap-4 pt-4 sm:grid-cols-2 md:grid-cols-3">
        <a class="block h-56 cursor-pointer rounded-2xl group transform hover:scale-[103%] duration-200" v-for="rest in restaurants" :key="rest._id">
          <div class="grid content-center w-full h-36 rounded-t-2xl overflow-hidden">
            <img class="w-full h-auto transform scale-105 group-hover:scale-110 duration-200" src="@/src/assets/test-images/splash.png">
          </div>
          <div class="px-4 py-2">
            <h1>{{ rest.name }} - {{ rest.slogan }}</h1>
            <hr class="my-1">
            <p class="flex gap-4 text-md">
              <span>{{ rest.tags }}</span>
              <span class="flex gap-1">
                <img src="@/src/assets/icons/smile1.svg">
                <span>{{ rest.rating }}</span>
              </span>
              <span class="flex gap-1">
                <img src="@/src/assets/icons/bike.svg">
                <span>{{ rest.deliveryCost }} DKK</span>
              </span>
              <span class="flex gap-1">
                <img src="@/src/assets/icons/bag.svg">
                <span>Min. {{ rest.minimumPrice }}</span>
              </span>
            </p>
          </div>
        </a>
    </div>
  </main>
</template>

<script setup>
const restaurants = ref([])

onMounted(() => {
  axios.get('https://meefood-1d4e.restdb.io/rest/restaurants', {
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "62714176fcf9897eb111a104",
      "cache-control": "no-cache",
    }
  })
  .then(res => {
    restaurants.value = res.data
  })
})
</script>

<style scoped>
a {
  box-shadow: 0px 1px 5px #707070;
}
</style>