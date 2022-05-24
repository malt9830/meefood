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
          class="w-40 h-40 absolute -top-16 sm:left-0 sm:m-4 rounded-full bg-white flex justify-center items-center"
        ></div>
        <div
          class="sm:ml-48 flex w-full flex-col items-center sm:items-start pt-24 sm:pt-0"
        >
          <h1
            v-if="loaded"
            class="text-2xl sm:text-3xl font-semibold p-3 sm:p-5"
          >
            {{ restaurant.name }}
          </h1>
        </div>
      </div>
    </div>
    <div :style="`background-color: ${restaurant.colorPrimary}`">
      <div
        class="flex flex-col-reverse gap-y-10 md:grid md:grid-cols-2 gap-x-10 sm:gap-x-28 py-10 justify-center px-20"
      >
        <div class="flex flex-col gap-y-5">
          <div class="flex justify-center md:justify-start">
          <div
            class="methods cursor-pointer w-80 h-10 bg-white rounded flex justify-between mt-10 "
          >
            <div
              id="afhenting"
              :style="`background-color: ${restaurant.colorSecondary}`"
              class="method duration-200 opacity-75 w-1/2 bg-white text-white rounded-l flex justify-center items-center"
            >
              <p>Afhentning</p>
            </div>
            <div
              id="levering"
              :style="`background-color: ${restaurant.colorSecondary}`"
              class="method duration-200 opacity-75 chosen w-1/2 text-white rounded-r text-center flex justify-center items-center"
            >
              <p>Levering</p>
            </div>
          </div>
          </div>
          <div class="flex flex-col gap-y-10 my-5">
            <div class="space-y-3">
              <h2 v-if="levering" class="font-semibold text-xl">Leveringstid</h2>
              <h2 v-if="!levering" class="font-semibold text-xl">Afhentningstid</h2>
              <div class="flex gap-x-5">
                <select
                  id="daySelect"
                  class="p-1.5 rounded bg-white text-gray-600"
                >
                  <option>I dag</option>
                  <option>I morgen</option>
                </select>
                <select
                  id="timeSelect"
                  class="p-1.5 rounded bg-white text-gray-600"
                >
                  <option>Hurtigst muligt</option>
                </select>
              </div>
            </div>


            <div v-if="levering" class="space-y-4">
              <h2 class="font-semibold text-xl">Leveringsadresse</h2>
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
                minlength="8"
                maxlength="8"
              />
            </div>
            <div class="space-y-3">
              <h2 class="font-semibold text-xl">Betalingsmetoder</h2>
              <div id="paymentOptions" class="flex space-x-2">
                <img
                  src="../assets/cards/visa.jpg"
                  alt="visa"
                  class="card duration-200 active w-12 hover:opacity-75 cursor-pointer"
                />

                <img
                  src="../assets/cards/mastercard.jpg"
                  alt="mastercard"
                  class="card duration-200 w-12 hover:opacity-75 cursor-pointer"
                />

                <img
                  src="../assets/cards/dankort.jpg"
                  alt="dankort"
                  class="card duration-200 w-12 hover:opacity-75 cursor-pointer"
                />

                <img
                  src="../assets/cards/mobilepay.jpg"
                  alt="mobilepay"
                  class="card duration-200 w-12 hover:opacity-75 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="md:sticky top-0 mt-5 md:mt-0 h-fit">
          <div
            :style="`border: 2px solid ${restaurant.colorSecondary}`"
            class="flex flex-col gap-y-5 p-7 h-fit rounded-2xl"
          >
            <h2 class="text-center font-semibold text-2xl">Din bestilling</h2>
            <div
              v-for="dish in store.basket"
              :key="dish.name"
              class="flex flex-col"
            >
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
      </div>
      <div class="md:ml-20 py-6 flex flex-wrap justify-center md:justify-start">
        <a
          href="/#"
          :style="`color: ${restaurant.colorSecondary}; border: 1px solid ${restaurant.colorSecondary}`"
          class="rounded-2xl py-2 px-6 bg-white hover:opacity-75 self-center m-3"
        >
          Tilbage til menuen</a
        >
        <a
          href="#"
          :style="`background-color: ${restaurant.colorSecondary}`"
          class="rounded-2xl py-2 px-6 text-white hover:opacity-75 self-center m-3"
        >
          Fortsæt til betaling
        </a>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted } from "@vue/runtime-core";
import Airtable from "airtable";
import { useBasketStore } from "/src/stores/basketStore";

const store = useBasketStore();

const route = useRoute();

const loaded = ref(false);

const loaded2 = ref(false);

const restaurant = ref();

const menu = ref([]);

const levering = ref(true);

const closingTime = ref("");
const openingTime = ref("");

const deliveryDay = ref("i dag");

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

function populate() {
  var select = document.querySelector("#timeSelect");
  var hours, minutes;
  var today = new Date();
  let number = today.getDay();

  if (number === 1) {
    console.log(restaurant.value.mandag.slice(8));
    var a = restaurant.value.mandag.slice(8).split(":");
    var mandagMinutes = +a[0] * 60 + +a[1];
    closingTime.value = mandagMinutes;
  }

  if (number === 2) {
    console.log(restaurant.value.tirsdag.slice(8));
    var a = restaurant.value.tirsdag.slice(8).split(":");
    var b = restaurant.value.tirsdag.slice(0, 4).split(":");
    closingTime.value = +a[0] * 60 + +a[1];
    openingTime.value = +b[0] * 60 + +b[1];
  }

  if (number === 3) {
    console.log(restaurant.value.onsdag.slice(8));
    var a = restaurant.value.onsdag.slice(8).split(":");
    var onsdagMinutes = +a[0] * 60 + +a[1];
    closingTime.value = onsdagMinutes;
  }

  if (number === 4) {
    console.log(restaurant.value.torsdag.slice(8));
    var a = restaurant.value.torsdag.slice(8).split(":");
    var torsdagMinutes = +a[0] * 60 + +a[1];
    closingTime.value = torsdagMinutes;
  }

  if (number === 5) {
    console.log(restaurant.value.fredag.slice(8));
    var a = restaurant.value.fredag.slice(8).split(":");
    var fredagMinutes = +a[0] * 60 + +a[1];
    closingTime.value = fredagMinutes;
  }

  if (number === 6) {
    console.log(restaurant.value.lordag.slice(8));
    var a = restaurant.value.lordag.slice(8).split(":");
    var lordagMinutes = +a[0] * 60 + +a[1];
    closingTime.value = lordagMinutes;
  }

  if (number === 0) {
    console.log(restaurant.value.sondag.slice(8));
    var a = restaurant.value.sondag.slice(8).split(":");
    var sondagMinutes = +a[0] * 60 + +a[1];
    closingTime.value = sondagMinutes;
  }

  for (var i = openingTime.value; i <= closingTime.value; i += 15) {
    hours = Math.floor(i / 60);
    minutes = i % 60;
    if (minutes < 10) {
      minutes = "0" + minutes; // adding leading zero
    }
    const option = document.createElement("option");
    option.setAttribute("value", i);

    var currentHour = today.getHours();
    option.innerText = hours + ":" + minutes;

    document.querySelector("#daySelect").addEventListener("change", () => {
      if (document.querySelector("#daySelect").value === "I morgen") {
        deliveryDay.value = "I morgen";
        select.appendChild(option);
        console.log(deliveryDay.value);
      } else {
        deliveryDay.value = "I dag";
        console.log(deliveryDay.value);
        if (hours > currentHour) {
          select.appendChild(option);
        }
      }
    });

    if (deliveryDay.value === "I morgen") {
      console.log("works");
      select.appendChild(option);
    } else {
      if (hours > currentHour) {
        select.appendChild(option);
      }
    }
  }
}

onMounted(() => {
  populate();
  var options = document.querySelectorAll(".card");
  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    option.addEventListener("click", function () {
      var x = document.querySelectorAll(".active");
      if (x.length) {
        x[0].classList.remove("active");
      }
      this.classList.toggle("active");
    });
  }
  var methods = document.querySelectorAll(".method");
  for (var i = 0; i < methods.length; i++) {
    var method = methods[i];
    method.addEventListener("click", function () {
      var y = document.querySelectorAll(".chosen");
      if (y.length) {
        y[0].classList.remove("chosen");
      }
      this.classList.toggle("chosen");
    });
  }
  document.querySelector(".methods").addEventListener("click", () => {
    if (document.querySelector("#afhenting").classList.contains("chosen")) {
      levering.value = false;
      console.log(levering.value);
    } else {
      levering.value = true;
      console.log(levering.value);
    }
  });
});
</script>

<style scoped>
.active {
  border: 2px solid green;
}

.chosen {
  border: green 2px solid;
  opacity: 100%;
}
</style>
