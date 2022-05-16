<template>
  <Teleport to="body">
    <div
      class="fixed w-screen h-screen top-0 left-0 before:content-[''] before:block before:w-screen before:h-screen before:bg-black before:opacity-50"
    >
      <div
        class="w-1/2 h-3/4 overflow-scroll bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded grid grid-rows-2 drop-shadow"
      >
        <div
          class="flex justify-end rounded"
          :style="`background-image: url(${dish.image[0].url}); background-size: cover; background-position-y: center`"
        >
          <Close
            @click="$emit('closePopUp')"
            class="h-10 sticky top-0"
            :style="`fill: ${restaurant.colorSecondary}`"
          />
        </div>
        <div class="flex flex-col gap-y-5 mx-10">
          <div class="flex flex-col gap-y-2">
            <div class="bg-white flex justify-between mt-5">
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
              <p class="text-xl">{{ dish.price }}kr</p>
            </div>
            <p class="text-sm">{{ dish.description }}</p>
            <div v-if="dish.options">
              <fieldset>
                <div
                  v-for="option in dish.options"
                  :key="option"
                  class="flex gap-x-2 my-1"
                >
                  <input
                    v-model="picked"
                    name="option"
                    type="radio"
                    :value="`${option}`"
                  />
                  <label>{{ option }}</label>
                </div>
              </fieldset>
            </div>
            <textarea
              v-model="comment"
              @input="showComment"
              class="border border-gray-500 rounded w-3/4 h-10 p-1 focus:outline-none"
              placeholder="Skriv en kommentar"
            ></textarea>
          </div>
          <div
            class="flex sticky shadow-2xl bottom-0 bg-white justify-center gap-x-7 py-3"
          >
            <button
              id="amount"
              @click="checkAmount"
              class="p-1.5 rounded w-40 flex items-center justify-between px-10"
              :style="`border: 1px solid ${restaurant.colorSecondary}; color: ${restaurant.colorSecondary}`"
            >
              <button @click="counter--" id="minus" class="text-2xl">-</button>
              <p class="font-semibold">{{ counter }}</p>
              <button @click="counter++" class="text-2xl">+</button>
            </button>
            <button
              @click="
                store.addToBasket(dish, counter, comment, picked);
                $emit('closePopUp');
              "
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

const store = useBasketStore();

const counter = ref(1);
const comment = ref("");

onMounted(() => {
  if (counter.value < 2) {
    document.querySelector("#minus").disabled = true;
  } else {
    document.querySelector("#minus").disabled = false;
  }
});

function showComment() {
  console.log(comment.value);
}

function checkAmount() {
  if (counter.value < 2) {
    document.querySelector("#minus").disabled = true;
  } else {
    document.querySelector("#minus").disabled = false;
  }
}

const props = defineProps({
  dish: Object,
  restaurant: Object,
  popUp: Boolean,
});

const emits = defineEmits(["closePopUp"]);
</script>
