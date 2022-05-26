<template>
  <div class="sticky top-0">
  <h2 class="text-xl text-center mt-5 font-semibold">Kurv</h2>
  <p v-if="store.basket.length < 1" class="text-center mt-5">Din kurv er tom</p>
  <div
    v-for="dish in store.basket"
    :key="dish.name"
    class="flex flex-col gap-y-2 mt-5 mx-4"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-md">{{ dish.amount }}x {{ dish.name }}</h3>
      <p class="text-sm">{{ dish.amount * dish.price }} kr</p>
    </div>
    <div class="flex justify-between items-center">
      <p class="text-xs" v-if="dish.comment">"{{ dish.comment }}"</p>
      <p v-if="!dish.comment && !dish.options"></p>
      <p class="text-xs" v-if="dish.options">{{dish.picked}}</p>
      <div class="flex items-center justify-end">
        <Minus
          @click="store.subtractAmount(dish)"
          :fill="`${restaurant.colorSecondary}`"
          class="h-5 cursor-pointer"
        />
        <Plus
          @click="store.addAmount(dish)"
          :fill="`${restaurant.colorSecondary}`"
          class="h-5 cursor-pointer"
        />
      </div>
    </div>
  </div>
  <div v-if="store.basket.length > 0" class="flex flex-col gap-y-2">
    <hr
    :style="`border-top: 1px solid ${restaurant.colorSecondary}`"
    class="m-4 mt-8"
  />
    <div class="flex justify-between mx-4">
      <p class="font-medium">Subtotal</p>
      <p>{{ store.totalPrice }} kr</p>
    </div>
    <div class="flex justify-between mx-4">
      <p class="font-medium">Levering</p>
      <p>{{ restaurant.deliveryCost }} kr</p>
    </div>
    <div class="flex justify-between mx-4">
      <p class="font-medium">Samlet</p>
      <p>{{ store.totalPrice + restaurant.deliveryCost }} kr</p>
    </div>
    <div class="flex justify-center mt-5">
    <RouterLink :class="{'pointer-events-none opacity-50' : store.totalPrice <= restaurant.minimumPrice}"  :to="`/checkout/${restaurant.slug}`"><button
      :style="`background-color: ${restaurant.colorSecondary}`"
      class="p-1.5 px-4 rounded text-white hover:opacity-75"
    >
      Gå til kassen
    </button></RouterLink>
  </div>
  <p v-if="store.totalPrice <= restaurant.minimumPrice" class="text-center mt-5">Minimum pris: {{restaurant.minimumPrice}}kr</p>
  </div>
  
  </div>
</template>

<script setup>
import { useBasketStore } from "/src/stores/basketStore";

const store = useBasketStore();




const props = defineProps({
  restaurant: Object,
  counter: Number,
  picked: String,
  loaded: Boolean,
});
</script>
