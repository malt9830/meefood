<template>
    <div class="absolute w-full overflow-hidden rounded ">
      <div
        class="flex justify-between"
      >
        <div class="w-1/2 flex flex-col justify-between">
          <div class="w-40 h-8 opacity-20 rounded" :style="`background-color: ${textColor}`"/>
          <div class="h-5 opacity-20 rounded" :style="`background-color: ${textColor}`"/>
          <div class="w-10 h-6 opacity-20 rounded" :style="`background-color: ${textColor}`"/>
        </div>
        <div class="w-40 h-28 opacity-20 rounded" :style="`background-color: ${textColor}`"/>
      </div>      
      <div class="absolute h-full w-full left-0 top-0 animate-dash">
        <aside class="absolute h-full w-96" :class="[ textColor === 'white' ? 'opacity-10' : 'opacity-50']" :style="`background: linear-gradient(to right, transparent, ${gradientColor}, transparent)`"/>
      </div>
    </div>
</template>

<script setup>
const props = defineProps({
  textColor: String,
  primaryColor: String,
})

const gradientColor = computed(() => {
  return (props.textColor === 'white' ? 'white' : props.primaryColor)
})
</script>