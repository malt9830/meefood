<template>
  <Header/>
  <RouterView/>
  <MobileMenu/>
  <Footer/>
</template>

<script setup>
import { useBasketStore } from './stores/basketStore'

const basketStore = useBasketStore()

onMounted(() => {
  console.log(console.log(basketStore.basket))
})
</script>