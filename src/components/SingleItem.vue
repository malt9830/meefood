<template>
    <div class="dish" @click="popUp = true">
                <div
                  class="flex justify-between mx-5"
                >
                  <div class="flex flex-col gap-y-2">
                    <div class="flex items-center gap-x-1">
                      <h3 class="text-xl font-medium">{{ dish.name }}</h3>
                      <Vegetarian
                        class="h-8"
                        :style="`fill: ${restaurant.colorSecondary}`"
                        v-if="dish.vegetarian === true"
                      />
                      <Vegan
                        class="h-8"
                        :style="`fill: ${restaurant.colorSecondary}`"
                        v-if="dish.vegan === true"
                      />
                    </div>
                    <p class="text-sm font-light">{{ dish.description }}</p>
                    <p class="text-md">{{ dish.price }}kr</p>
                  </div>
                  <img :src="dish.image[0].url" class="w-40 h-28 rounded" />
                  <ItemPopUp
                  v-if="popUp === true"
                  :dish="dish"
                  :restaurant="restaurant"
                  :popUp="popUp"
                />
                </div>
              </div>
</template>

<script setup>

const props = defineProps({
  dish: Object,
  restaurant: Object,
})

const popUp = ref(false);


</script>