<template>
  <main>
    <h1 v-if="restaurant">{{ restaurant.name }}</h1>
  </main>
</template>

<script setup>
const route = useRoute()

const restaurant = ref()

onMounted(() => {
  axios.get(`https://meefood-1d4e.restdb.io/rest/restaurants/${route.params.id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "62714176fcf9897eb111a104",
      "cache-control": "no-cache",
    }
  })
  .then(res => {
    restaurant.value = res.data
  })
})
</script>