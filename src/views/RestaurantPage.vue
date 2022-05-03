<template>
  <main>
    <h1>{{ restaurantInfo }}</h1>
  </main>
</template>

<script setup>
const route = useRoute()

const restaurantInfo = ref(0)

onMounted(() => {
  restaurantInfo.value = route.params.id
})
</script>