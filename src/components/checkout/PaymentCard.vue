<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-emerald-50"
  >
    <!-- <ArrowLeft
      @click="$emit('closePayment')"
      class="w-10 sm:absolute sm:top-24 sm:left-5 hover:opacity-75 cursor-pointer"
    /> -->
    <div
      class="sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:w-3/4 md:w-5/12 h-full bg-emerald-50 sm:h-fit sm:bg-gradient-to-b sm:from-emerald-500 sm:to-emerald-300 sm:rounded-2xl pt-20 sm:pt-0"
    >
      <div class="flex flex-col justify-between my-5 gap-y-2">
        <div class="flex justify-center gap-x-5">
          <img class="w-14" src="../../assets/cards/visa.jpg" alt="visa" />
          <img
            class="w-14"
            src="../../assets/cards/mastercard.jpg"
            alt="mastercard"
          />
          <img class="w-14" src="../../assets/cards/dankort.jpg" alt="dankort" />
        </div>

        <form payment-form class="flex flex-col gap-y-5 mx-5">
          <div class="flex flex-col gap-y-2">
            <label for="cardName" class="text-black sm:text-white">Navn på kortholder</label>
            <input
              id="name"
              class="peer p-1.5 border-2 rounded focus:outline-none text-gray-600"
              type="text"
              name="cardName"
              placeholder="John Doe"
              minlength="4"
              required
              v-model="nameOnCard"
            />
            <p v-if="formSubmitted" class="hidden bg-red-500 w-fit p-1 rounded text-xs peer-invalid:block">
              Dette felt er påkrævet
            </p>
          </div>

          <div class="flex flex-col gap-y-2">
            <label for="cardNumber" class="text-black sm:text-white">Kortnummer</label>
            <input
              v-model="cardNumber"
              @keydown="formatNumber($event)"
              id="number"
              class="peer p-1.5 border-2 rounded focus:outline-none text-gray-600"
              type="text"
              name="cardNumber"
              placeholder="XXXX XXXX XXXX XXXX"
              pattern="([0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4})"
              maxlength="19"
              required
            />
            <p v-if="formSubmitted" class="hidden bg-red-500 w-fit p-1 rounded text-xs peer-invalid:block">
              Dette felt er påkrævet
            </p>
          </div>

          <div class="flex justify-between gap-x-2">
            <div class="flex gap-x-1 w-1/2">
              <div class="flex flex-col gap-y-2 w-1/2">
                <label for="expiryMonth" class="text-black sm:text-white">Udløbdato</label>
                <input
                  v-model="expiryMonth"
                  @keydown="formatMonth"
                  id="month"
                  class="peer p-1.5 border-2 rounded focus:outline-none text-gray-600"
                  type="text"
                  name="expiryMonth"
                  placeholder="MM"
                  pattern="[0-9]{2}"
                  required
                />
                <p v-if="formSubmitted" class="hidden bg-red-500 w-fit p-1 rounded text-xs peer-invalid:block">
                  Dette felt er påkrævet
                </p>
              </div>
              <div class="flex flex-col gap-y-2 w-1/2">
                <label for="expiryYear" class="invisible"> . </label>
                <input
                  v-model="expiryYear"
                  @keydown="formatYear"
                  id="year"
                  class="peer p-1.5 border-2 rounded focus:outline-none text-gray-600"
                  type="text"
                  name="expiryYear"
                  placeholder="YY"
                  pattern="[0-9]{2}"
                  maxlength="2"
                  required
                />
                <p v-if="formSubmitted" class="hidden bg-red-500 w-fit p-1 rounded text-xs peer-invalid:block">
                  Dette felt er påkrævet
                </p>
              </div>
            </div>

            <div class="flex flex-col gap-y-2 w-1/3">
              <label for="securityCode" class="text-black sm:text-white">CVV nr</label>
              <input
                v-model="securityCode"
                id="code"
                class="peer p-1.5 border-2 rounded focus:outline-none text-gray-600"
                type="text"
                name="securityCode"
                placeholder="XXX"
                pattern="[0-9]{3}"
                maxlength="3"
                required
              />
                <p v-if="formSubmitted" class="hidden bg-red-500 w-fit p-1 rounded text-xs peer-invalid:block">
                  Dette felt er påkrævet
                </p>
            </div>
          </div>
        </form>
      </div>
    </div>
    <button
      @click="validateForm"
      class="absolute left-1/2 -translate-x-1/2 rounded-xl font-medium hover:opacity-75 duration-200 bottom-14 p-1.5 bg-emerald-500"
    >
      Godkend betaling
    </button>
  </div>
  <ThankYou v-if="paymentValid" :restaurant="restaurant" :deliveryMethod="deliveryMethod" :deliveryDay="deliveryDay" :deliveryTime="deliveryTime" />
</template>

<script setup>
const props = defineProps({
  restaurant: Object,
  deliveryMethod: String,
  deliveryDay: String,
  deliveryTime: String,
});

const formSubmitted = ref(false)
const paymentValid = ref(false);
const nameOnCard = ref("");
const cardNumber = ref("");
const expiryMonth = ref("");
const expiryYear = ref("");
const securityCode = ref("");

function validateForm () {
  paymentValid.value = document.querySelector("[payment-form]").checkValidity()
  formSubmitted.value = true
}

function formatNumber(e) {
  e.target.value = e.target.value
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatMonth() {
  if (expiryMonth.value > 1 && expiryMonth.value.length == 1) {
    expiryMonth.value = `0${expiryMonth.value}`;
    document.querySelector("#year").focus();
  } else if (expiryMonth.value.length == 2 && expiryMonth.value[1] <= 2) {
    document.querySelector("#year").focus();
  } 
}

function formatYear() {
  if (expiryYear.value.length == 2) {
    document.querySelector("#code").focus();
  }
}
</script>

<style scoped>
/* Hide number arrows on inputs */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none; 
}
</style>