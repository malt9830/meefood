<template>
  <div class="fixed z-10 w-screen h-full bg-white pb-4">
    <div class="absolute z-10 top-0 left-0 w-full h-full bg-black/20">
      <div class="absolute h-full w-full left-0 top-0 animate-splash">
        <aside class="absolute h-full w-full bg-gradient-to-r from-transparent via-white/20"/>
      </div>
    </div>
    <div class="relative h-80 sm:h-[50vh] w-full bg-gray-300">
    </div>
    <div class="relative flex flex-col max-w-7xl mx-auto sm:flex-row items-center sm:l-10">
      <div class="w-40 h-40 absolute -top-16 sm:mt-1 sm:top-0 lg:-top-16 sm:left-0 sm:m-4 rounded-full bg-white flex justify-center items-center border-2">
        <div class="p-2"/>
      </div>
      <div class="sm:ml-48 flex flex-col w-full items-center sm:items-start pt-24 sm:pt-0">
        <h1 class="text-2xl sm:text-3xl font-semibold p-3 sm:p-5"></h1>
        <div class="flex flex-col sm:flex-row sm:flex-wrap flex-start place-items-center px-5 gap-y-2 sm:gap-x-6 sm:items-start w-full">
          <div class="flex flex-wrap justify-between place-self-center sm:justify-start w-full sm:w-fit sm:gap-x-5">
            <p></p>
            <div class="flex gap-1 items-center">
            </div>
          </div>
          <div v-for="n in 6" :key="n" class="h-6 w-28 bg-gray-300 mr-auto sm:mr-0" />
        </div>
      </div>
    </div>

    <div class="sm:grid sm:grid-cols-6 mt-5 md:mt-16 max-w-7xl mx-auto">
      <div v-if="!tablet" class="flex flex-col pt-5 gap-y-5 border-t border-r"></div>
      <div class="col-span-6 md:col-span-4 border-t border-r-gray-300 border-r-0 md:border-r">
        <div class="relative flex flex-col gap-y-5">
          <div class="h-28 w-full" v-for="n in 5" :key="n">
            <DishPlaceholder class="p-4" primaryColor="white" textColor="black" />
          </div>
        </div>
      </div>
      <div v-if="!tablet" class="flex flex-col border-t"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tablet: Boolean
})
</script>