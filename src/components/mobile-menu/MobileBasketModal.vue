<template>
  <Teleport to="body">
    <Transition name="slide" :duration="400">
      <div v-if="showBasket" class="fixed left-0 bottom-0 z-40 w-full flex justify-end pb-16">
        <aside class="w-full z-10 bg-white p-4 rounded-t-2xl shadow-top">
          <p class="text-2xl text-gray-500 font-semibold">Kurv</p>
          <p v-if="store.basket.length === 0">Din kurv er tom</p>
          <div v-for="dish in store.basket" :key="dish.name" class="flex flex-col" >
            <hr class="my-2 border-gray-300">
            <div class="flex justify-between items-center text-md">
              <h3 >{{ dish.amount }}x {{ dish.name }}</h3>
              <p >{{ dish.amount * dish.price }} kr</p>
            </div>
            <div class="flex justify-between items-center text-sm">
              <p class="text-xs" v-if="dish.comment">"{{ dish.comment }}"</p>
              <!-- <p v-if="!dish.comment && !dish.options" class="text-emerald-500 underline underline-offset-1">Tilføj note</p> -->
              <p class="text-xs" v-if="dish.options">{{dish.picked}}</p>
              <div class="flex items-center ml-auto">
                <Minus @click="store.subtractAmount(dish)" class="h-6 fill-emerald-500"/>
                <Plus @click="store.addAmount(dish)" class="h-6 fill-emerald-500"/>
              </div>
            </div>
          </div>
          <hr class="my-4 border-emerald-500">
          <div v-if="store.basket.length > 0" class="mb-4">
            <div class="flex justify-between">
              <p class="font-medium">Subtotal</p>
              <p>{{ store.totalPrice }} kr</p>
            </div>
            <div class="flex justify-between">
              <p class="font-medium">Levering</p>
              <p>{{ 30 }} kr</p>
            </div>
            <div class="flex justify-between">
              <p class="font-medium">Samlet</p>
              <p>{{ store.totalPrice + 30 }} kr</p>
            </div>
          </div>
          <RouterLink :to="`/checkout/${route.params.id}`" @click="emits('closeBasket')" :class="{ 'brightness-50 pointer-events-none' : store.basket.length === 0 || !store.reachedMinimumPrice}" class="block text-center w-full bg-emerald-500 text-white font-semibold rounded-xl py-4 transform duration-200 hover:bg-emerald-600 active:scale-95">Gå til kassen</RouterLink>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useBasketStore } from "/src/stores/basketStore";

const props = defineProps(['showBasket'])
const emits = defineEmits(['closeBasket'])
const store = useBasketStore();
const route = useRoute()
</script>

<style scoped>
.slide-enter-active aside,
.slide-leave-active aside {
  transform: translateY(0%);
  transition-duration: 400ms;
}

.slide-enter-from aside,
.slide-leave-to aside {
  transform: translateY(100%);
  transition-duration: 400ms;
}
</style>