<template>
  <div class="relative h-[80vh] w-full bg-center bg-cover bg-fixed grid grid-rows-[2fr_3fr]">
    <!-- <img class="absolute pointer-events-none w-3/5 hidden sm:block" src="/src/assets/splash-image/banner-desktop.png"> -->
    <!-- <div class="absolute pointer-events-none w-full">
      <div class="w-full h-60 bg-emerald-500"/>
      <img class="w-full object-cover" src="/src/assets/splash-image/banner-bottom.svg">
    </div> -->
    <!-- <img class="absolute pointer-events-none w-full sm:hidden" src="/src/assets/splash-image/banner-mobile.png"> -->
    <div class="z-10 bg-emerald-500 flex items-end">
      <div class="max-w-4xl w-full mx-auto px-4">
        <h2 class="flex flex-row gap-2 text-white text-4xl font-bold mb-8">
          <span>Spis</span>
          <span :class="[wordHidden ? 'max-w-0' : 'max-w-[6rem]']" class="inline-block underline underline-offset-4 overflow-x-clip overflow-y-visible duration-[800ms]">{{ currentWord }}</span>
          <span>som helst</span>
        </h2>
        <form class="flex gap-2 max-w-sm rounded-xl bg-white border-2 border-white">
          <input class="grow px-4 py-2 rounded-xl focus:outline-none" placeholder="Adresse, postnummer eller by">
          <RouterLink to="/restaurants" class="inline-block text-center bg-emerald-500 border border-white text-white hover:bg-emerald-600 py-2 px-4 rounded-xl duration-200">Søg</RouterLink>
        </form>
      </div>
    </div>
    <div class="bg-[url('./assets/splash-image.png')] w-full bg-cover bg-center">
      <div class="absolute w-full h-40 bg-[url('./assets/splash-image/banner-bottom.svg')] bg-no-repeat bg-center bg-cover"/>
    </div>
  </div>
</template>

<script setup>
const currentWord = ref('hvad')
const wordHidden = ref(false)

setInterval(() => {
  wordHidden.value = true

  setTimeout(() => {
    wordHidden.value = false

    if (currentWord.value === 'hvad') {
      currentWord.value = 'hvor'
    } else if (currentWord.value === 'hvor') {
      currentWord.value = 'når'
    } else if (currentWord.value === 'når') {
      currentWord.value = 'hvad'
    }
  }, 1000)
}, 2500)
</script>

<style scoped>
.shift-enter-active,
.shift-leave-active {
  transition: all 700ms ease-in-out;
}

.shift-enter-from {
  color: transparent;
  transform: translateY(-100%);
}
.shift-leave-to {
  color: transparent;
  transform: translateY(100%)
}
</style>