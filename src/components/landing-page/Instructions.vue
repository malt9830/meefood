<template>
    <section class="max-w-5xl mx-auto py-20">
      <h2 class="text-3xl font-semibold text-center">Instruktioner</h2>
      <div class="flex md:grid-cols-3">
        <div v-for="inst in instructions" :key="inst.number">
            <img class="place-self-center p-12" :src="`./src/assets/instructions/instructions-${inst.number}.svg`">
            <p class="text-2xl text-center">{{ inst.text }}</p>
        </div>
      </div>
    </section>
</template>

<script setup>
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