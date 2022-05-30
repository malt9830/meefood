<template>
  <div
    class="fixed z-[60] w-screen h-screen top-0 left-0 grid"
  >
    <div @click="$emit('closePopUp')" class="absolute bg-black/50 top-0 left-0 h-full w-full"/>
    <aside
      class="fixed place-self-center w-screen sm:w-3/4 lg:w-1/2 max-w-2xl h-full sm:h-3/4 bg-white overflow-hidden rounded flex flex-col p-4 pt-12 sm:py-0 sm:px-0"
    >
      <div scrollable @scroll="dishScrolled" class="w-full grow overflow-auto pb-16">
        <div class="w-full h-60 sm:w-full sm:h-3/5 flex justify-end rounded bg-center bg-cover" :style="`background-image: url(${dish.image[0].url})`">
          <Close
            @click="$emit('closePopUp')"
            class="h-10 absolute sm:sticky top-0 right-0 cursor-pointer"
            :style="`fill: ${restaurant.colorSecondary}`"
          />
        </div>
        <div class="w-full sm:gap-y-5 sm:px-4">
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
        </div>
      </div>
      <div class="absolute self-center bottom-0 flex justify-items-center w-[calc(100%-2rem)] py-4 bg-gradient-to-t from-white via-white/70">
        <div class="flex gap-4 mx-auto">
          <div
            id="amount"
            @click="checkAmount"
            class="bg-white rounded w-40 grid grid-cols-3 items-center justify-between duration-200"
            :class="[ scrolledBottom ? 'shadow-card' : 'shadow-button']"
            :style="`border: 1px solid ${restaurant.colorSecondary}; color: ${restaurant.colorSecondary}`"
          >
            <button @click="counter--" :disabled="counter < 2" class="text-2xl py-1.5">-</button>
            <p class="font-semibold text-center">{{ counter }}</p>
            <button @click="counter++" class="text-2xl py-1.5">+</button>
          </div>
          <button
            @click="basketStore.addToBasket(dish, counter, picked);$emit('closePopUp');"
            class="p-1.5 rounded w-40 text-white duration-200 hover:opacity-75"
            :class="[ scrolledBottom ? 'shadow-card' : 'shadow-button']"
            :style="`background: ${restaurant.colorSecondary}`"
          >
            Tilføj
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { useBasketStore } from "/src/stores/basketStore";

const basketStore = useBasketStore();

const props = defineProps({
  dish: Object,
  restaurant: Object,
});
const emits = defineEmits(["closePopUp"]);

const counter = ref(1);
const picked = ref('')

const scrolledBottom = ref(true)

function dishScrolled (e) {
  scrolledBottom.value = (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight)
}

onMounted(() => {
  // If dish has options, set picked to first value
  picked.value = (props.dish.options === undefined ? '' : props.dish.options[0])

  // Add shadow to scrollable dishes
  const scrollable = document.querySelector('div[scrollable]')
  scrolledBottom.value = (scrollable.scrollHeight - scrollable.scrollTop === scrollable.clientHeight)
})
</script>

<style scoped>
.slide-enter-active aside,
.slide-leave-active aside {
  opacity: 1;
  transform: translateY(0%);
  transition-duration: 300ms;
}

.slide-enter-from aside,
.slide-leave-to aside {
  opacity: 0;
  transform: translateY(10%);
  transition-duration: 300ms;
}
</style>