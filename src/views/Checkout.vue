<template>
  <main :class="textColor">
    <div
      v-if="!loaded"
      class="h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"
    ></div>
    <div v-if="loaded" :style="`background-color: ${restaurant.colorPrimary}`">
      <div
        :style="`background-image: url(${restaurant.splash[0].url})`"
        class="h-[70vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed"
      ></div>
      <div class="relative flex flex-col sm:flex-row items-center sm:ml-10">
        <div
          :style="`border: 2px solid ${restaurant.colorSecondary}; background-image: url(${restaurant.logo[0].url}); background-size: contain; background-repeat: no-repeat`"
          class="w-40 h-40 sm:absolute top-0 md:-top-16 left-0 rounded-full bg-white flex justify-center items-center"
        ></div>
        <div class="sm:ml-40 flex flex-col items-center sm:items-start">
          <h1 v-if="loaded" class="text-3xl font-semibold sm:p-5">
            {{ restaurant.name }}
          </h1>
        </div>
      </div>
    </div>
    <div
      :style="`background-color: ${restaurant.colorPrimary}`"
      class="grid grid-cols-2 gap-x-28 my-10 justify-center mx-20"
    >
      <div :style="border" class="flex flex-col gap-y-5">
        <div class="flex flex-col gap-y-2">
        <div class="flex flex-row space-x-2 self-center lg:self-start">
          <h3>Har du allerede en bruger?</h3>

          <User :style="`fill: ${restaurant.colorSecondary}`"/>
        </div>

        <a
          href="/#"
          :style="`background-color: ${restaurant.colorSecondary}`"
          class="rounded-2xl py-2 px-6 text-white hover:opacity-75 self-center lg:self-start"
          >Log ind</a
        >
        </div>
        <div
          class="inline-flex rounded-full border border-black focus:shadow-lg bg-white self-center lg:self-start"
          role="group"
        >
          <a
            href="#"
            type="button"
            :style="`background-color: ${restaurant.colorSecondary}`"
            class="border-r border-black rounded-2xl inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase hover:bg-emerald-500 hover:text-white focus:text-white focus:bg-emerald-500 focus:outline-none focus:ring-0 active:bg-emerald-600 transition duration-150 ease-in-out"
            >Udbringning</a
          >

          <a
            href="#"
            type="button"
            class="rounded-2xl inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase focus:text-white focus:bg-emerald-500 focus:outline-none focus:ring-0 active:bg-emerald-600 transition duration-150 ease-in-out"
            >Hent selv</a
          >
        </div>
        <div class="flex flex-col gap-y-10 my-5">
      <div class="space-y-3">
        <h2>Leveringstid</h2>
        <div>
          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            class="inline-flex items-center rounded-lg bg-white border px-4 py-2.5 text-center text-gray-500 focus:outline-none focus:ring-4"
            type="button"
          >
            Dropdown button
            <svg
              class="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div
            id="dropdown"
            class="z-10 hidden w-44 divide-y divide-emerald-100 rounded bg-white shadow dark:bg-gray-700"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="bottom"
            style="
              position: absolute;
              inset: 0px auto auto 0px;
              margin: 0px;
              transform: translate3d(391.2px, 681.6px, 0px);
            "
          >
            <ul
              class="py-1 text-sm text-emerald-700 dark:text-emerald-200"
              aria-labelledby="dropdownDefault"
            >
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white"
                  >Hurtigst muligt</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white"
                  >option 1</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white"
                  >option 2</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white"
                  >option 3</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div>
          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            class="inline-flex items-center rounded-lg bg-white border px-4 py-2.5 text-center text-gray-500 focus:outline-none focus:ring-4"
            type="button"
          >
            Dropdown button
            <svg
              class="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div
            id="dropdown"
            class="z-10 hidden w-44 divide-y divide-emerald-100 rounded bg-white shadow dark:bg-gray-700"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="bottom"
            style="
              position: absolute;
              inset: 0px auto auto 0px;
              margin: 0px;
              transform: translate3d(391.2px, 681.6px, 0px);
            "
          >
            <ul
              class="py-1 text-sm text-emerald-700 dark:text-emerald-200"
              aria-labelledby="dropdownDefault"
            >
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white"
                  >Hurtigst muligt</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white"
                  >option 1</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white"
                  >option 2</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white"
                  >option 3</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2>Leveringsadresse</h2>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Fornavn"
          type="text"
          placeholder="Fornavn"
        />
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Efternavn"
          type="text"
          placeholder="Efternavn"
        />
        <div class="grid grid-cols-[auto_6rem] gap-2">
          <input
            class="mr-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Adresse"
            type="text"
            placeholder="Adresse"
          />
          <input
            class="w- shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="postnummer"
            type="text"
            placeholder="Post nr."
          />
        </div>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Email"
          type="text"
          placeholder="Email"
        />
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Telefonnummer"
          type="text"
          placeholder="Telefonnummer"
        />
        <h2>Betalingsmetoder</h2>
        <div class="flex space-x-2">
          <a href="">
            <img src="Image 18.png" alt="" />
          </a>
          <a href="">
            <img src="Image 19.png" alt="" />
          </a>
          <a href="">
            <img src="Image 20.png" alt="" />
          </a>
          <a href="">
            <img src="Image 21.png" alt="" />
          </a>
        </div>
      </div>
      </div>
    </div>
    <div
      :style="`border: 2px solid ${restaurant.colorSecondary}`"
      class="flex flex-col gap-y-5 p-7 h-fit sticky rounded-2xl"
    >
      <h2 class="text-center font-semibold text-2xl">Din bestilling</h2>
      <div v-for="dish in store.basket" :key="dish.name" class="flex flex-col">
        <div class="flex justify-between items-center">
          <h3 class="text-md">{{ dish.amount }}x {{ dish.name }}</h3>
          <p class="text-sm">{{ dish.amount * dish.price }}kr</p>
        </div>
        <div class="flex justify-start items-center gap-x-5">
          <p class="text-xs" v-if="dish.options">{{ dish.picked }}</p>
          <p v-if="!dish.comment && !dish.options"></p>
          <p class="text-xs" v-if="dish.comment">"{{ dish.comment }}"</p>
        </div>
      </div>
      <hr :style="`border-color: ${restaurant.colorSecondary}`" />
      <div class="flex flex-col gap-y-4">
        <div class="flex justify-between">
          <p class="font-semibold">Subtotal</p>
          <p>{{ store.totalPrice }}kr</p>
        </div>
        <div class="flex justify-between">
          <p class="font-semibold">Levering</p>
          <p>{{ restaurant.deliveryCost }}kr</p>
        </div>
        <div class="flex justify-between">
          <p class="font-semibold">Samlet</p>
          <p>{{ store.totalPrice + restaurant.deliveryCost }}kr</p>
        </div>
      </div>
    </div>
    </div>
    <div class="ml-20 pt-6 flex flex-wrap">
        <a
          href="/#"
          :style="`color: ${restaurant.colorSecondary}; border: 1px solid ${restaurant.colorSecondary}`"
          class=" rounded-2xl py-2 px-6 text-white hover:opacity-75 self-center m-3"
        >
          Tilbage til menuen</a
        >
        <a
          href="/#"
           :style="`background-color: ${restaurant.colorSecondary}`"
          class="rounded-2xl py-2 px-6 text-white hover:opacity-75 self-center m-3"
        >
        Fortsæt til betaling
          </a
        >
      </div>
  </main>
</template>

<script setup>
import Airtable from "airtable";
import { useBasketStore } from "/src/stores/basketStore";

const store = useBasketStore();

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
      loaded2.value = true;
    }, 2000);
  });

const textColor = computed(() => {
  //Parse integers from hexadecimal to decimal
  const r = parseInt(restaurant.value?.colorPrimary.substring(1, 3), 16);
  const g = parseInt(restaurant.value?.colorPrimary.substring(3, 5), 16);
  const b = parseInt(restaurant.value?.colorPrimary.substring(5, 7), 16);

  // Calculate luminance, i.e. measurement of brightness
  const luminance = Math.round(r * 0.2126 + g * 0.7152 + b * 0.0722);

  // Return Tailwind text class of black or white based on brightness
  return luminance > 150 ? "text-black" : "text-white";
});
</script>
