<template>
    <div class="cursor-pointer">
      <div class="relative h-full w-full">
        <DishPlaceholder v-if="!menuLoaded" :primaryColor="primaryColor" :textColor="textColor" />
      </div>
      <div @click="showDishModal = true"
            :class="[ menuLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none']"
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
        <div :style="`background-image: url(${dish.image[0].url})`" class="w-40 h-28 rounded bg-cover bg-no-repeat bg-center" />
        
        <Teleport to="body">
          <Transition name="slide" :duration="300">
            <DishModal
              v-if="showDishModal"
              :dish="dish"
              :restaurant="restaurant"
              @closeDishModal="showDishModal = false"
            />
          </Transition>
        </Teleport>
      </div>
    </div>
</template>

<script setup>

const props = defineProps({
  dish: Object,
  restaurant: Object,
  category: String,
  menuLoaded: Boolean,
  primaryColor: String,
  textColor: String
})

const showDishModal = ref(false);

// Prevent scrolling body when a modal is open
watch(showDishModal, (modal) => {
  document.querySelector("body").style.overflow = (modal ? 'hidden' : 'auto')
  document.querySelector("main > div").style.paddingRight = (modal ? '1rem' : '0')
  document.querySelector("main > div > div:first-of-type").style.width = (modal ? 'calc(100% + 1rem)' : '100%')
  document.querySelector("header > div").style.paddingRight = (modal ? '1rem' : '0')
})
</script>