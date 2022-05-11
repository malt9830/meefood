<template>
  <div class="relative h-[75vh] w-full bg-[url('./assets/splash-image.png')] bg-center bg-cover bg-fixed grid">
    <img class="absolute pointer-events-none w-3/5 hidden sm:block" src="/src/assets/splash-image/banner-desktop.png">
    <img class="absolute pointer-events-none w-full sm:hidden" src="/src/assets/splash-image/banner-mobile.png">
    <div class="z-10 w-1/2 min-w-min max-w-3xl place-self-center">

      <!-- <h2 class="relative text-white text-4xl font-bold mb-8 overflow-hidden">
        <span>Spis </span>
        <TransitionGroup :duration="1000" name="shift" tag="span" class="inline-block w-24">
          <span v-if="sloganRefs[0].shown" class="absolute top-0 w-24 text-center">hvad</span>
          <span v-if="sloganRefs[1].shown" class="absolute top-0 w-24 text-center">hvor</span>
          <span v-if="sloganRefs[2].shown" class="absolute top-0 w-24 text-center">når</span>
        </TransitionGroup>
        <span> som helst</span>
      </h2> -->

      <h2 class="flex flex-row gap-2 text-white text-4xl font-bold mb-8">
        <span>Spis</span>
        <span :class="{'max-w-0' : wordHidden }" class="inline-block max-w-[6rem] underline underline-offset-4 overflow-x-clip overflow-y-visible duration-[800ms]">{{ currentWord }}</span>
        <span>som helst</span>
      </h2>

      <form class="flex gap-2">
        <input class="grow px-4 py-2 rounded-xl focus:outline-none" placeholder="Adresse, postnummer eller by">
        <Button text="Søg" class="hidden sm:block"/>
      </form>
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

// const sloganRefs = ref([{shown: true}, {shown: false}, {shown: false}])
// const currentWord = ref(0)
// const nextWord = ref(1)

// setInterval(() => {
//   sloganRefs.value[currentWord.value].shown = false
//   sloganRefs.value[nextWord.value].shown = true

//   currentWord.value = (currentWord.value < 2 ? currentWord.value + 1 : 0)
//   nextWord.value = (nextWord.value < 2 ? nextWord.value + 1 : 0)
// }, 1750)
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