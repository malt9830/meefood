<template>
  <Teleport to="body">
    <div class="fixed left-0 top-0 z-20 h-full w-full flex justify-end">
      <div @click="$emit('closeFilter')" class="absolute left-0 top-0 h-full w-full bg-black opacity-50" />
      <aside class="h-full w-96 max-w-full z-10 bg-white px-8 shadow-2xl">
        <div class="mt-20">
          <p class="text-2xl text-gray-500 font-semibold mt-8">Filtrering</p>
          <p></p>
          <p class="text-2xl text-gray-500 font-semibold mt-8">Sortering</p>
          <p></p>
        </div>
      </aside>
    </div>
  </Teleport>
</template>