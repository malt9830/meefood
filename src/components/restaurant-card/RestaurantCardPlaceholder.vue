<template>
  <div class="absolute w-full h-full bg-white rounded-xl shadow-card overflow-hidden">
    <div>
      <div class="relative flex flex-col w-full h-40 rounded-t-xl">
        <div class="absolute flex h-full w-full rounded-t-xl overflow-hidden">
          <div class="h-full w-full bg-gray-200" />
        </div>
        <div class="flex flex-row mt-auto px-2 transform translate-y-6">
          <div class="grid w-20 aspect-square bg-gray-200 border-4 border-white rounded-full overflow-hidden">
          </div>
          <span class="inline-block h-6 w-28 bg-white mx-2 mb-2 self-center" />
        </div>
      </div>
      <div class="px-4 pb-2 pt-1">
        <span class="block h-4 w-20 bg-gray-200 ml-20" />
        <hr class="my-2">
        <div class="flex flex-wrap gap-2 text-sm">
          <span v-for="n in 4" :key="n" class="block h-3 w-12 bg-gray-200" />
        </div>
      </div>
    </div>
    <div class="absolute h-full w-full left-0 top-0 animate-dash">
      <aside class="absolute h-full w-96 opacity-30 bg-gradient-to-r from-transparent via-white to-transparent" />
    </div>
  </div>
</template>