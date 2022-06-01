<template>
  <div class="m-4">
    <h2 :id="`${category}`" class="text-2xl sm:text-3xl font-semibold mb-5 capitalize">{{category}}</h2>
    <div class="flex flex-col gap-y-5">
      <Dish v-for="dish in filteredMenu" :key="dish.name" :dish="dish" :restaurant="restaurant" :category="category" :menuLoaded="menuLoaded" :primaryColor="primaryColor" :textColor="textColor" />
    </div>
  </div>
</template>
      
<script setup>
const props = defineProps({
    restaurant: Object,
    filteredMenu: Array,
    category: String,
    menuLoaded: Boolean,
    textColor: String,
    primaryColor: String,
})
</script>
