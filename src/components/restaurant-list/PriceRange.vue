<template>
  <span class="flex gap-1 items-center">
    <DollarIcon :class="{ 'fill-emerald-500' : dollar1 }" class="h-6 w-auto"/>
    <DollarIcon :class="{ 'fill-emerald-500' : dollar2 }" class="h-6 w-auto"/>
    <DollarIcon :class="{ 'fill-emerald-500' : dollar3 }" class="h-6 w-auto"/>
    <DollarIcon :class="{ 'fill-emerald-500' : dollar4 }" class="h-6 w-auto"/>
  </span>        
</template>

<script setup>
const props = defineProps({
  priceRange: String
})

const dollar1 = computed(() => {return props.priceRange <= 4})
const dollar2 = computed(() => {return props.priceRange <= 3})
const dollar3 = computed(() => {return props.priceRange <= 2})
const dollar4 = computed(() => {return props.priceRange <= 1})

</script>