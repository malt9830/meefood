<template>
    <main>
    <div
      v-if="!loaded"
      class="h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"
    ></div>
    <div v-if="loaded" :style="`background-color: ${restaurant.colorPrimary}`">
      <div
        :style="`background-image: url(${restaurant.splash[0].url})`"
        class="h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"
      >
      </div>
      <div class="flex flex-col sm:flex-row items-center sm:ml-10">
        <div
          :style="`border: 2px solid ${restaurant.colorSecondary}`"
          class="w-40 -mt-8 rounded-full bg-white flex justify-center items-center"
        >
          <img :src="restaurant.logo[0].url" class="p-8" />
        </div>
        <div class="flex flex-col items-center sm:items-start">
          <h1 v-if="loaded" class="text-3xl font-semibold sm:p-5">
            {{ restaurant.name }}
          </h1>
        </div>
      </div>
    </div>
    </main>
</template>

<script setup>
import Airtable from "airtable";

const route = useRoute();

const loaded = ref(false);

const loaded2 = ref(false);

const restaurant = ref();

const menu = ref([]);

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "keyiA3gmotxYIJjLc",
});

var base = Airtable.base("appRiP6vD6l7EmCYB");

base("restaurants")
  .select({
    filterByFormula: `{slug} = '${route.params.id}'`,
  })
  .eachPage((res) => {
    restaurant.value = res[0].fields;

    loaded.value = true;

    base(`menu-${restaurant.value.slug}`)
      .select()
      .eachPage((res) => {
        res.forEach((dish) => {
          menu.value.push(dish.fields);
        });
      });
      setTimeout(() => {
    loaded2.value = true
  }, 2000)
  });


</script>
