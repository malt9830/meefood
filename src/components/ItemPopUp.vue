<template>
    <div
                  class="w-1/2 h-3/4 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded grid grid-rows-3"
                >
                  <div
                    class="row-span-2 flex justify-end rounded"
                    :style="`background-image: url(${dish.image[0].url}); background-size: cover; background-position-y: center`"
                  >
                    <Close
                      @click="popUp = false"
                      class="h-10"
                      :style="`fill: ${restaurant.colorSecondary}`"
                    />
                  </div>
                  <div class="flex flex-col gap-y-2 mx-10">
                    <div class="bg-white flex justify-between mt-5">
                      <h1 class="text-2xl font-semibold">{{ dish.name }}</h1>
                      <p class="text-xl">{{ dish.price }}kr</p>
                    </div>
                    <p class="text-sm">{{ dish.description }}</p>
                    <div class="flex justify-center gap-x-7 mt-3">
                      <button
                        class="p-1.5 rounded w-40 flex justify-between px-10"
                        :style="`border: 1px solid ${restaurant.colorSecondary}; color: ${restaurant.colorSecondary}`"
                      >
                        <p>-</p>
                        <p>1</p>
                        <p>+</p>
                      </button>
                      <button
                        class="p-1.5 rounded w-40 text-white"
                        :style="`background: ${restaurant.colorSecondary}`"
                      >
                        Tilføj
                      </button>
                    </div>
                  </div>
                </div>
</template>

<script setup>

const props = defineProps({
  dish: Object,
  restaurant: Object,
  popUp: Boolean
})

</script>