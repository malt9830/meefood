<template>
  <button class="bg-emerald-500 text-white hover:bg-emerald-600 py-2 px-4 rounded-xl duration-200">{{text}}</button>
</template>

<script setup>
const props = defineProps({
  text: String
})
</script>