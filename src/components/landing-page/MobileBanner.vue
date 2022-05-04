<template>
  <section class="py-20">
    <div class="relative grid grid-cols-10 grid-rows-4 md:hidden">
      <div class="bg-emerald-600 col-start-1 col-end-11 row-start-2 row-end-5" />
      <img class="col-start-2 col-end-10 row-start-1 row-end-5" src="@/src/assets/download-app/app-mockup.svg">
    </div>
    <div class="bg-emerald-600 text-white px-4 py-12">
      <div class="max-w-4xl mx-auto grid gap-4 md:grid-cols-[2fr_3fr]">
        <div>
          <p class="text-3xl font-semibold">Download vores app</p>
          <p class="mt-2">Få det hele er lige ved hånden - de restauranter og den mad, du elsker. Find det mad der passer til dit humør, og få den første bid til at vare ved.  download os.</p>
          <div class="flex gap-2 mt-4">
            <img class="h-10" src="@/src/assets/download-app/app-store-badge.svg">
            <img class="h-10" src="@/src/assets/download-app/google-play-badge.svg">
          </div>
        </div>
        <div class="relative hidden md:block">
          <img class="absolute top-1/2 left-0 w-full transform -translate-y-1/2" src="@/src/assets/download-app/app-mockup.svg">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>