<template>
  <div class="m-4">
      <div class="flex flex-col gap-y-5">
        <SingleItem v-for="dish in searchResult" :key="dish.name" :dish="dish" :restaurant="restaurant" :category="category" :menuLoaded="menuLoaded"/>
      </div>
    </div>
</template>

<script setup>

const props = defineProps({
    restaurant: Object,
    menuLoaded: Boolean,
    category: String,
    search: String,
    searchResult: Array,
})

</script>