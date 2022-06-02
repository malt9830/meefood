<template>
  <Teleport to="body">
    <Transition name="slide" :duration="400">
      <div v-if="showUser" class="fixed left-0 bottom-0 z-40 w-full flex justify-end pb-16">
        <aside class="w-full z-10 bg-white p-4 rounded-t-2xl shadow-top">
          <p class="text-2xl text-gray-500 font-semibold">Log ind</p>
          <form>
            <fieldset class="mt-4 border-2 border-gray-500 rounded-xl">
              <input v-model="username" placeholder="Indtast brugernavn" type="text" class="bg-transparent w-full px-4 py-2 rounded-xl focus:outline-none">
            </fieldset>
            <fieldset class="mt-4 border-2 border-gray-500 rounded-xl">
              <input v-model="password" placeholder="Indtast password" type="password" class="bg-transparent w-full px-4 py-2 rounded-xl focus:outline-none">
            </fieldset>
          </form>
          <button @click="emits('closeUser')" class="w-full bg-emerald-200 text-emerald-900 font-semibold rounded-xl mt-4 py-4 transform duration-200 hover:bg-emerald-100 active:scale-95">Glemt din kode?</button>
          <button @click="emits('closeUser')" class="w-full bg-emerald-500 text-white font-semibold rounded-xl mt-4 py-4 transform duration-200 hover:bg-emerald-600 active:scale-95">Log ind</button>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps(['showUser'])
const emits = defineEmits(['closeUser'])

const username = ref('')
const password = ref('')
</script>

<style scoped>
.slide-enter-active aside,
.slide-leave-active aside {
  transform: translateY(0%);
  transition-duration: 400ms;
}

.slide-enter-from aside,
.slide-leave-to aside {
  transform: translateY(100%);
  transition-duration: 400ms;
}
</style>