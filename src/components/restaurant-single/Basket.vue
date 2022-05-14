<template>
  <h2 class="text-xl text-center mt-5 font-semibold">Kurv</h2>
  <p v-if="store.basket.length < 1" class="text-center mt-5">Din kurv er tom</p>
  <div
    v-for="dish in store.basket"
    :key="dish.name"
    class="flex flex-col mt-5 mx-4"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-md">{{ dish.amount }}x {{ dish.name }}</h3>
      <p class="text-sm">{{ dish.amount * dish.price }}kr</p>
    </div>
    <div class="flex justify-start items-center">
      <Minus
        @click="store.subtractAmount(dish)"
        :fill="`${restaurant.colorSecondary}`"
        class="h-5"
      />
      <Plus
        @click="store.addAmount(dish)"
        :fill="`${restaurant.colorSecondary}`"
        class="h-5"
      />
    </div>
  </div>
  <hr
    :style="`border-top: 1px solid ${restaurant.colorSecondary}`"
    class="m-4 mt-8"
  />
  <div class="flex flex-col gap-y-2">
    <div class="flex justify-between mx-4">
      <p class="font-medium">Subtotal</p>
      <p>{{ store.totalPrice }}kr</p>
    </div>
    <div class="flex justify-between mx-4">
      <p class="font-medium">Levering</p>
      <p>{{ restaurant.deliveryCost }}kr</p>
    </div>
    <div class="flex justify-between mx-4">
      <p class="font-medium">Samlet</p>
      <p>{{ store.totalPrice + restaurant.deliveryCost }}kr</p>
    </div>
  </div>
  <div class="flex justify-center mt-5">
    <button
      :style="`background-color: ${restaurant.colorSecondary}`"
      class="p-1.5 rounded text-white hover:opacity-75"
    >
      Gå til kassen
    </button>
  </div>
</template>

<script setup>
import { useBasketStore } from "/src/stores/basketStore";

const store = useBasketStore();

const props = defineProps({
  restaurant: Object,
  counter: Number,
});
</script>
