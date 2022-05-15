<template>
  <header :class="{'bg-emerald-500' : routeName === 'restaurants'}" class="absolute z-20 text-white w-full py-4 px-8">
      <nav class="max-w-7xl mx-auto flex flex-row justify-between">
        <RouterLink to="/"><Logo/></RouterLink>
        <div class="hidden md:flex flex-row gap-4 items-center">
          <RouterLink to="/restaurants">Restauranter</RouterLink>
          <RouterLink to="/" class="px-2 py-1 border border-white rounded-xl duration-200 hover:bg-white hover:text-black">Log ind</RouterLink>
        </div>
      </nav>
  </header>
</template>

<script setup>
const route = useRoute()

const routeName = computed(() => {
  return route.name
})
</script>