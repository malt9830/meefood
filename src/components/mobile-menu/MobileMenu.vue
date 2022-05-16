<template>
  <Teleport to="body" v-if="isMobile">
    <div class="fixed bottom-0 w-full bg-white h-16 grid grid-cols-3 items-center shadow-top">
      <div class="w-full h-full grid cursor-pointer">
        <Filter v-if="routeName === 'restaurants'" class="h-6 w-auto m-auto fill-gray-500"/>
        <Bag2 v-if="routeName === 'restaurant'" class="h-6 w-auto m-auto fill-gray-500"/>
      </div>
      <div class="w-full h-full grid cursor-pointer">
        <Pin class="h-8 w-auto m-auto fill-gray-500"/>
      </div>
      <div class="w-full h-full grid cursor-pointer">
        <Search class="h-8 w-auto m-auto fill-gray-500"/>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const route = useRoute()

const routeName = computed(() => {
  return route.name
})

const isMobile = ref(false)

onMounted(() => {
  isMobile.value = (window.innerWidth < 600 ? true : false)

  window.addEventListener('resize', () => {
    isMobile.value = (window.innerWidth < 600 ? true : false)
  })
})
</script>