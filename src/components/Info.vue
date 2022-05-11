<template>
  <Teleport to="body">
    <div
      class="fixed w-screen h-screen top-0 left-0 before:content-[''] before:block before:w-screen before:h-screen before:bg-black before:opacity-50"
    >
      <div
        class="w-1/2 h-3/4 overflow-scroll bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded grid grid-rows-3 drop-shadow"
      >
        <div class="row-span-2 flex justify-end rounded bg-emerald-500">
          <Close
            @click="$emit('closeInfo')"
            class="h-10"
            :style="`fill: ${restaurant.colorSecondary}`"
          />
        </div>
        <div class="flex flex-col m-5 gap-y-8">
          <div class="flex flex-col gap-y-2">
          <h1 class="text-xl font-semibold">Åbningstider</h1>
          <div>
            <div class="flex justify-between">
              <p>Mandag</p>
              <p>{{ restaurant.mandag }}</p>
            </div>
            <div class="flex justify-between">
              <p>Tirsdag</p>
              <p>{{ restaurant.tirsdag }}</p>
            </div>
            <div class="flex justify-between">
              <p>Onsdag</p>
              <p>{{ restaurant.onsdag }}</p>
            </div>
            <div class="flex justify-between">
              <p>Torsdag</p>
              <p>{{ restaurant.torsdag }}</p>
            </div>
            <div class="flex justify-between">
              <p>Fredag</p>
              <p>{{ restaurant.fredag }}</p>
            </div>
            <div class="flex justify-between">
              <p>Lørdag</p>
              <p>{{ restaurant.lordag }}</p>
            </div>
            <div class="flex justify-between">
              <p>Søndag</p>
              <p>{{ restaurant.sondag }}</p>
            </div>
          </div>
          </div>
          <div class="flex flex-col gap-y-2 pb-5">
          <h1 class="text-xl font-semibold">Kontakt</h1>
          <div class="flex flex-col gap-y-2">
            <p>+45{{ restaurant.phone }}</p>
            <p>{{ restaurant.email }}</p>
            <p>{{ restaurant.address }}</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  info: Boolean,
  restaurant: Object,
});
</script>
