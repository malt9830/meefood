<template>
    <h2 class="text-xl text-center mt-5 font-semibold">Kurv</h2>
          <div class="flex justify-between items-center mt-5 mx-4">
            <h3 class="text-md">item</h3>
            <p class="text-sm">price</p>
          </div>
          <hr
            :style="`border-top: 1px solid ${restaurant.colorSecondary}`"
            class="m-4 mt-8"
          />
          <div class="flex flex-col gap-y-2">
            <div class="flex justify-between mx-4">
              <p class="font-medium">Subtotal</p>
              <p>price</p>
            </div>
            <div class="flex justify-between mx-4">
              <p class="font-medium">Levering</p>
              <p>{{ restaurant.deliveryCost }}kr</p>
            </div>
            <div class="flex justify-between mx-4">
              <p class="font-medium">Samlet</p>
              <p>price + {{ restaurant.deliveryCost }}kr</p>
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

const props = defineProps({
    restaurant: Object
})

</script>