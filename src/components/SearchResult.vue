<template>
    <div class="m-10">
            <div class="flex flex-col gap-y-5">
              <SingleItem v-for="dish in searchResult" :key="dish.name" :dish="dish" :restaurant="restaurant" :category="category" />
            </div>
      </div>
</template>

<script setup>

const props = defineProps({
    restaurant: Object,
    menu: Array,
    category: String,
    search: String,
    searchResult: Array
})

</script>