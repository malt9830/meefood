<template>
  <main>
    <div class="relative h-screen w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed grid">
      <img class="absolute pointer-events-none w-1/2 hidden sm:block" src="@/src/assets/triangle-cover-desktop.svg">
      <img class="absolute pointer-events-none w-full sm:hidden" src="@/src/assets/triangle-cover-mobile.svg">
      <div class="z-10 w-1/2 min-w-min max-w-3xl place-self-center">
        <form class="flex gap-2">
          <input class="grow px-4 py-2 rounded-xl focus:outline-none" placeholder="Adresse, postnummer eller by">
          <Button text="Søg" class="hidden sm:block"/>
        </form>
      </div>
    </div>
    <Instructions/>
    <MobileBanner/>
    <RestaurantShowcase/>
  </main>
</template>

<script setup>
</script>