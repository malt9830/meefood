<template>
    <section class="max-w-5xl mx-auto py-10">
      <h2 class="text-3xl font-semibold text-center text-gray-800 ">Det gøres ikke nemmere!</h2>
      <Carousel :items-to-show="1" :breakpoints="breakpoints">
        <template #slides>
          <Slide v-for="inst in instructions" :key="inst.number">
            <div class="px-12 sm:px-2">
              <img class="place-self-center px-12 py-4" :src="`./instructions/instructions-${inst.number}.svg`">
              <p class="text-xl lg:text-2xl text-center text-gray-800">{{ inst.text }}</p>
            </div>
          </Slide>
        </template>
        <template #addons>
          <Navigation/>
          <Pagination class="mt-4 sm:hidden"/>
        </template>
      </Carousel>
    </section>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const breakpoints = ref({
  640: {
    itemsToShow: 3,
  }
})

const instructions = [
  {
    number: 1,
    text: "Indtast din placering"
  },
  {
    number: 2,
    text: "Vælg dine livretter"
  },
  {
    number: 3,
    text: "Levering til døren"
  }
]
</script>

<style>
.carousel__pagination-button {
  display: grid;
  border: 2px solid #10b981;
  border-radius: 999px;
  height: 1.3rem;
  width: 1.3rem;
}

.carousel__pagination-button::after {
  content: "";
  place-self: center;
  border: 2px solid white;
  border-radius: 999px;
  height: 100%;
  width: 100%;
  transform: scale(0.5);
  transition-duration: 200ms;
}

.carousel__pagination-button--active::after {
  background-color: #10b981;
  transform: scale(1);
}

.carousel__prev,
.carousel__next {
  transform: translateY(-100%);
  height: auto;
  width: auto;
  margin-inline: 1rem;
}

.carousel__prev--in-active,
.carousel__next--in-active {
  display: none;
}

.carousel__icon {
  background-color: #ECFDF5;
  border-radius: 999px;
  fill: #10b981;
  height: 3rem;
  width: auto;
}
</style>