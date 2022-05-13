<template>
  <div class="relative h-[65vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed grid">
    <img class="absolute pointer-events-none w-3/5 hidden sm:block" src="/src/assets/splash-image/banner-desktop.png">
    <img class="absolute pointer-events-none w-full sm:hidden" src="/src/assets/splash-image/banner-mobile.png">
    <div class="z-10 self-center">
      <div class="max-w-4xl mx-auto p-4">
        <h2 class="flex flex-row gap-2 text-white text-4xl font-bold mb-8">
          <span>Spis</span>
          <span :class="[wordHidden ? 'max-w-0' : 'max-w-[6rem]']" class="inline-block underline underline-offset-4 overflow-x-clip overflow-y-visible duration-[800ms]">{{ currentWord }}</span>
          <span>som helst</span>
        </h2>
        <form class="flex gap-2 max-w-sm">
          <input class="grow px-4 py-2 rounded-xl focus:outline-none" placeholder="Adresse, postnummer eller by">
          <RouterLink to="/restaurants" class="inline-block text-center bg-emerald-500 text-white hover:bg-emerald-600 py-2 px-4 rounded-xl duration-200">Søg</RouterLink>
        </form>
      </div>
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