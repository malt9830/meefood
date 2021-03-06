<template>
  <div
    class="fixed z-40 top-0 left-0 w-screen h-screen flex flex-col overflow-hidden bg-emerald-100"
  >
    <ArrowLeft
      @click="$emit('closePayment')"
      class="w-10 hover:opacity-75 m-4 cursor-pointer"
    />
    <div class="w-full grow sm:grid sm:place-content-center">
      <div
        class="w-full max-w-xl mx-auto bg-emerald-100 sm:h-fit sm:bg-gradient-to-b sm:from-emerald-500 sm:to-emerald-300 sm:rounded-2xl sm:py-4"
      >
        <div class="flex flex-col justify-between my-5 gap-y-2">
          <div class="flex justify-center gap-x-5 mb-6">
            <img class="w-14" src="@/cards/visa.jpg" alt="visa" />
            <img
              class="w-14"
              src="@/cards/mastercard.jpg"
              alt="mastercard"
            />
            <img class="w-14" src="@/cards/dankort.jpg" alt="dankort" />
          </div>

          <form payment-form class="flex flex-col gap-y-5 mx-5">
            <div class="flex flex-col gap-y-2">
              <label for="cardName" class="text-black sm:text-white">Navn på kortholder</label>
              <input
                id="name"
                :class="{ 'invalid:border-red-500 invalid:bg-red-100 valid:border-green-500 valid:bg-green-200' : formSubmitted }"
                class="peer p-1.5 border-2 rounded focus:outline-none text-gray-600"
                type="text"
                name="cardName"
                placeholder="John Doe"
                minlength="4"
                required
                v-model="nameOnCard"
              />
              
            </div>

            <div class="flex flex-col gap-y-2">
              <label for="cardNumber" class="text-black sm:text-white">Kortnummer</label>
              <input
                v-model="cardNumber"
                id="number"
                :class="{ 'invalid:border-red-500 invalid:bg-red-100 valid:border-green-500 valid:bg-green-200' : formSubmitted }"
                class="peer p-1.5 border-2 rounded focus:outline-none text-gray-600"
                type="text"
                inputmode="numeric"
                number="cardNumber"
                placeholder="XXXX XXXX XXXX XXXX"
                pattern="([0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4})"
                maxlength="19"
                required
              />
            </div>

            <div class="flex justify-between gap-x-2">
              <div class="flex gap-x-1 w-1/2">
                <div class="flex flex-col gap-y-2 w-1/2">
                  <label for="expiryMonth" class="text-black sm:text-white">Udløbdato</label>
                  <input
                    v-model="expiryMonth"
                    id="month"
                    :class="{ 'invalid:border-red-500 invalid:bg-red-100 valid:border-green-500 valid:bg-green-200' : formSubmitted }"
                    class="peer p-1.5 border-2 rounded focus:outline-none text-gray-600"
                    type="text"
                    inputmode="numeric"
                    name="expiryMonth"
                    placeholder="MM"
                    pattern="(0[1-9]|1[0-2])"
                    maxlength="2"
                    required
                  />
                </div>
                <div class="flex flex-col gap-y-2 w-1/2">
                  <label for="expiryYear" class="invisible"> . </label>
                  <input
                    v-model="expiryYear"
                    id="year"
                    :class="{ 'invalid:border-red-500 invalid:bg-red-100 valid:border-green-500 valid:bg-green-200' : formSubmitted }"
                    class="peer p-1.5 border-2 rounded focus:outline-none text-gray-600"
                    type="text"
                    inputmode="numeric"
                    name="expiryYear"
                    placeholder="YY"
                    pattern="(2[2-7])"
                    maxlength="2"
                    required
                  />
                </div>
              </div>

              <div class="flex flex-col gap-y-2 w-1/3">
                <label for="securityCode" class="text-black sm:text-white">CVV nr</label>
                <input
                  v-model="securityCode"
                  id="code"
                  :class="{ 'invalid:border-red-500 invalid:bg-red-100 valid:border-green-500 valid:bg-green-200' : formSubmitted }"
                  class="peer p-1.5 border-2 rounded focus:outline-none text-gray-600"
                  type="text"
                  inputmode="numeric"
                  name="securityCode"
                  placeholder="XXX"
                  pattern="[0-9]{3}"
                  maxlength="3"
                  required
                />
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="flex justify-center pb-24">
      <button
        @click="validateForm"
        class="text-white rounded font-medium hover:opacity-75 duration-200 px-3 py-2 bg-emerald-500"
      >
        Godkend betaling
      </button>
    </div>
  </div>
  <ThankYou v-if="paymentValid" @closeModals="$emit('closePayment')" :restaurant="restaurant" :deliveryMethod="deliveryMethod" :deliveryDay="deliveryDay" :deliveryTime="deliveryTime" />
</template>

<script setup>
const props = defineProps({
  restaurant: Object,
  deliveryMethod: String,
  deliveryDay: String,
  deliveryTime: String,
});
const emits = defineEmits(['closePayment'])

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

  if (paymentValid.value) localStorage.setItem(`basket-${props.restaurant.slug}`, '[]')
}

// Reformat card number
watch(cardNumber, (value) => {
  cardNumber.value = value.replace(/[^\dA-Z]/g, "").replace(/(.{4})/g, "$1 ").trim();
  if (cardNumber.value.length === 19) document.querySelector('#month').focus()
})

// Reformat expiry month
watch(expiryMonth, (value) => {
  expiryMonth.value = value.replace(/[^\dA-Z]/g, "").trim();
  if (expiryMonth.value.length === 2) document.querySelector('#year').focus()
})

// Reformat expiry year
watch(expiryYear, (value) => {
  expiryYear.value = value.replace(/[^\dA-Z]/g, "").trim();
  if (expiryYear.value.length === 2) document.querySelector('#code').focus()
})

onMounted(() => window.scrollTo({top: 0}))
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