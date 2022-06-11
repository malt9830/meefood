<template>
  <div class="fixed z-[60] w-screen h-screen top-0 left-0 grid">
    <div
      @click="$emit('closeSignUp')"
      class="absolute bg-black/50 top-0 left-0 h-full w-full"
    />
    <aside
      class="fixed place-self-center w-screen sm:w-3/4 lg:w-1/2 max-w-2xl h-full sm:h-4/5 bg-white overflow-hidden rounded flex flex-col p-4 pt-12 sm:py-0 sm:px-0"
    >
      <div
        class="relative h-16 bg-emerald-500 flex justify-center items-center"
      >
        <h1 class="text-white font-semibold text-xl">Opret konto</h1>
        <Close
          @click="$emit('closeSignUp')"
          class="absolute right-0 w-10 cursor-pointer"
          fill="white"
        />
      </div>
      <div class="flex flex-col my-5 gap-y-5 h-full justify-between">
        <div class="space-y-5">
          <div
            class="bg-white border border-gray-500 rounded max-w-2xl h-10 mx-5 p-2 flex relative items-center justify-center"
          >
            <img
              src="/src/assets/login/google.png"
              alt="google"
              class="h-8 absolute left-2"
            />
            <p class="text-gray-800">Fortsæt med Google</p>
          </div>
          <div
            class="bg-blue-700 border border-gray-500 rounded max-w-2xl h-10 mx-5 p-2 flex relative items-center justify-center"
          >
            <img
              src="/src/assets/login/facebook.png"
              alt="facebook"
              class="h-8 absolute left-2"
            />
            <p class="text-white">Fortsæt med Facebook</p>
          </div>
        </div>
        <div>
          <div class="flex justify-center items-center mb-7">
            <hr class="w-1/4" />
            <p class="px-4 text-sm text-gray-500">
              eller opret konto med e-mail
            </p>
            <hr class="w-1/4" />
          </div>
          <form class="flex flex-col space-y-4">
            <fieldset class="flex flex-col mx-5">
              <label class="text-gray-800" for="email">E-mail adresse</label>
              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                class="border p-1.5 rounded text-gray-500 focus:outline-none"
              />
            </fieldset>
            <fieldset class="flex flex-col mx-5">
              <label for="password">Adgangskode</label>
              <input
                id="password"
                v-model="password"
                type="password"
                name="password"
                class="border p-1.5 rounded text-gray-500 focus:outline-none"
              />
            </fieldset>
            <button type="button"
              @click="checkInfo"
              class="w-fit self-center bg-emerald-500 p-1.5 rounded text-white px-5 font-semibold"
            >
              Opret konto
            </button>
          </form>
        </div>
      </div>
    </aside>
    <aside v-if="signedUp === true" class="fixed place-self-center w-screen sm:w-3/4 lg:w-1/2 max-w-2xl h-full sm:h-4/5 bg-white overflow-hidden rounded flex flex-col p-4 pt-12 sm:py-0 sm:px-0">
      <div class="flex flex-col justify-center items-center my-10 mx-10 gap-y-10">
        <h1 class="font-semibold text-2xl">Konto oprettet!</h1>
         <img
              src="/src/assets/login/mail.png"
              alt="mail icon"
              class=""
            />
        <p class="text-center">Bekræft din konto ved at klikke på linket, vi har sendt dig til {{email}}. </p>
      </div>
    </aside>
  </div>
</template>

<script setup>

const signedUp = ref(false);
const email = ref('');
const password = ref('');

function checkInfo() {
if (email.value !== '' && password.value !== '') {
  signedUp.value = true
}
}

</script>
