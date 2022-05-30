<template>
  <div class="sm:m-10 m-4">
    <h2 :id="`${category}`" class="text-2xl sm:text-3xl font-semibold mb-5 capitalize">{{category}}</h2>
    <div class="flex flex-col gap-y-5">
      <SingleItem v-for="dish in filteredMenu" :key="dish.name" :dish="dish" :restaurant="restaurant" :category="category" :menuLoaded="menuLoaded" :primaryColor="primaryColor" :textColor="textColor" />
    </div>
  </div>
</template>
      
<script setup>
import { computed, onMounted } from "@vue/runtime-core"

const props = defineProps({
    restaurant: Object,
    menu: Array,
    category: String,
    search: String,
    searchResult: Array,
    menuLoaded: Boolean,
    textColor: String,
    primaryColor: String,
})

const filteredMenu = computed(() => {
    return props.menu
    .filter(dish => dish.category === props.category)
    .sort((a, b) => new Date(a.price) - new Date(b.price))
})
</script>
