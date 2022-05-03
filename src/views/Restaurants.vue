<template>
  <main class="max-w-5xl mx-auto mt-8 px-4">
    <h2>Restaurants</h2>
    <div class="grid grid-cols-3">
      <article v-for="rest in restaurants" :key="rest._id">
        <h1 :style="`background-color:${rest.primaryColor}; color:${rest.secondaryColor}`">{{ rest.name }}</h1>
      </article>
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