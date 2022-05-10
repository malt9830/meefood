<template>
    <section class="max-w-5xl mx-auto py-10">
      <h2 class="text-3xl font-semibold text-center">Instruktioner</h2>
      <Carousel :items-to-show="1" :breakpoints="breakpoints">
        <Slide v-for="inst in instructions" :key="inst.number">
          <div class="px-12 md:px-8">
            <img class="place-self-center px-12 py-4" :src="`./src/assets/instructions/instructions-${inst.number}.svg`">
            <p class="text-xl lg:text-2xl text-center">{{ inst.text }}</p>
          </div>
        </Slide>
        <template #addons>
          <Navigation/>
          <Pagination class="mt-4 lg:hidden"/>
        </template>
      </Carousel>
    </section>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const breakpoints = ref({
  1024: {
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
    text: "Vælg restaurant og mad"
  },
  {
    number: 3,
    text: "Få din mad leveret"
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
  background-color: white;
  border-radius: 999px;
  fill: #10b981;
  height: 3rem;
  width: auto;
}
</style>