<template>
  <Teleport to="body">
    <div
      class="fixed z-20 w-screen h-screen top-0 left-0 before:content-[''] before:block before:w-screen before:h-screen before:bg-black before:opacity-50"
    >
      <div @click="$emit('closePopUp')" class="absolute top-0 left-0 h-full w-full"/>
      <div
        class="w-screen sm:w-3/4 lg:w-1/2 h-screen sm:h-3/4 bg-white overflow-auto bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded flex flex-col items-center pt-10 sm:pt-0 gap-y-0 sm:gap-y-5 sm:grid sm:grid-rows-2"
      >
        <div
          class="w-80 h-80 sm:w-full sm:h-full flex justify-end rounded"
          :style="`background-image: url(${dish.image[0].url}); background-size: cover; background-position-y: center`"
        >
          <Close
            @click="$emit('closePopUp')"
            class="h-10 absolute sm:sticky top-0 right-0 cursor-pointer"
            :style="`fill: ${restaurant.colorSecondary}`"
          />
        </div>
        <div class="flex flex-col gap-y-10 w-full overflow-scroll sm:gap-y-5 px-10">
          <div class="flex flex-col gap-y-4 sm:gap-y-2">
            <div class=" flex justify-between mt-5">
              <div class="flex gap-x-2">
                <h1 class="text-2xl font-semibold">{{ dish.name }}</h1>
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
              <p class="text-xl">{{ dish.price }} kr</p>
            </div>
            <p class="text-sm">{{ dish.description }}</p>
            <div v-if="dish.options">
              <fieldset>
                <div
                  v-for="option in dish.options"
                  :key="option"
                  class="flex gap-x-2 my-1 items-center"
                >
                  <input
                    v-model="picked"
                    type="radio"
                    :id="option"
                    :value="option"
                  />
                  <label :for="option">{{ option }}</label>
                </div>
              </fieldset>
            </div>
          </div>
          <div
            class="flex sm:static absolute bottom-20 left-1/2 -translate-x-1/2 sm:translate-x-0 justify-center gap-x-7 py-2 "
          >
            <div
              id="amount"
              @click="checkAmount"
              class="bg-white rounded w-40 grid grid-cols-3 items-center justify-between"
              :style="`border: 1px solid ${restaurant.colorSecondary}; color: ${restaurant.colorSecondary}`"
            >
              <button @click="counter--" :disabled="counter < 2" class="text-2xl py-1.5">-</button>
              <p class="font-semibold text-center">{{ counter }}</p>
              <button @click="counter++" class="text-2xl py-1.5">+</button>
            </div>
            <button
              @click="basketStore.addToBasket(dish, counter, picked);$emit('closePopUp');"
              class="p-1.5 rounded w-40 text-white hover:opacity-75"
              :style="`background: ${restaurant.colorSecondary}`"
            >
              Tilføj
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useBasketStore } from "/src/stores/basketStore";

const basketStore = useBasketStore();
const emits = defineEmits(["closePopUp"]);

const counter = ref(1);
const picked = ref('')

const props = defineProps({
  dish: Object,
  restaurant: Object,
  popUp: Boolean,
});

// If dish has options, set picked to first value
onMounted(() => {picked.value = (props.dish.options === undefined ? '' : props.dish.options[0])})

</script>
