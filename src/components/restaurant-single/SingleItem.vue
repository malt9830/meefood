<template>
    <div class="dish" @click="popUp = true">
      <div
        class="flex justify-between"
      >
        <div class="w-1/2 flex flex-col gap-y-2">
          <div class="flex items-center gap-x-1">
            <h3 class="text-lg sm:text-xl font-medium">{{ dish.name }}</h3>
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
          <p class="text-xs sm:text-sm font-light">{{ dish.description }}</p>
          <p class="text-md">{{ dish.price }}kr</p>
        </div>
        <div :style="`background-image: url(${dish.image[0].url}); background-size: cover; background-repeat: no-repeat`" class="w-40 h-28 bg-center rounded" />
        <ItemPopUp
        v-if="popUp"
        :dish="dish"
        :restaurant="restaurant"
        :popUp="popUp"
        @close-pop-up="closePopUp"
      />
      </div>
    </div>
</template>

<script setup>

const props = defineProps({
  dish: Object,
  restaurant: Object,
  category: String
})

const popUp = ref(false);

function closePopUp() {
  popUp.value = false;
  console.log(popUp.value)
}

</script>